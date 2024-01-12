#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { JeopardyStack } from "../lib/cdk/jeopardy-cdk-stack";

const app = new cdk.App();
new JeopardyStack(app, "JeopardyGameStack");
