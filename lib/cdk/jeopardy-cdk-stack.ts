import { Duration, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import path from "path";

export class JeopardyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handler = new NodejsFunction(this, "Handler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "handler",
      entry: "server.ts",
      architecture: lambda.Architecture.ARM_64,
      timeout: Duration.seconds(10),
      environment: {},
      bundling: {
        minify: true,
        sourceMap: true,
        externalModules: ["next"],
        commandHooks: {
          beforeBundling(inputDir: string, outputDir: string): string[] {
            return [
              `cp -r ${inputDir}/.next/standalone/  ${outputDir}/`,
              `mkdir -p ${outputDir}/node_modules`,
              `cp -r ${inputDir}/node_modules/next  ${outputDir}/node_modules`,
              `mkdir -p ${outputDir}/node_modules/@next`,
              `cp ${inputDir}/package.json ${outputDir}/`,
              `cp ${inputDir}/package-lock.json ${outputDir}/`,
            ];
          },
          beforeInstall(): string[] {
            return [];
          },
          afterBundling(): string[] {
            return [];
          },
        },
      },
    });

    // Define the API Gateway
    const api = new apigateway.RestApi(this, "Api", {
      restApiName: "Jeopardy Game API",
      binaryMediaTypes: ["*/*"],
      deployOptions: {
        tracingEnabled: true,
      },
      defaultIntegration: new apigateway.LambdaIntegration(handler),
    });

    const proxyResource = api.root.addProxy({
      anyMethod: true,
    });

    const assetsBucket = new Bucket(this, "Bucket", {
      publicReadAccess: false,
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const deployment = new BucketDeployment(this, "Deployment", {
      sources: [Source.asset(path.join(__dirname, "../../.next/static"))],
      destinationBucket: assetsBucket,
      destinationKeyPrefix: "static",
    });

    const executeRole = new Role(this, "ApiGatewayS3AssumeRole", {
      assumedBy: new ServicePrincipal("apigateway.amazonaws.com"),
    });

    assetsBucket.grantReadWrite(executeRole);

    const s3Integration = new apigateway.AwsIntegration({
      service: "s3",
      path: `${assetsBucket.bucketName}/{proxy}`,
      integrationHttpMethod: "GET",
      options: {
        credentialsRole: executeRole,
        passthroughBehavior: apigateway.PassthroughBehavior.WHEN_NO_MATCH,
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Content-Type":
                "integration.response.header.Content-Type",
            },
          },
        ],

        requestParameters: {
          "integration.request.path.proxy": "method.request.path.proxy",
        },
      },
    });

    api.root
      .addResource("_next")
      .addResource("{proxy+}")
      .addMethod("GET", s3Integration, {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Content-Type": true,
            },
          },
        ],
        requestParameters: {
          "method.request.path.proxy": true,
          "method.request.header.Content-Type": true,
        },
      });
  }
}
