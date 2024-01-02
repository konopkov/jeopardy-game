import * as fs from "fs";
import NextServer from "next/dist/server/next-server";
import * as path from "path";
import serverless from "./serverless-http";

// import * as requiredServerFiles from "./.next/required-server-files.json";
const requiredServerFiles = JSON.parse(
  fs.readFileSync("./.next/required-server-files.json", "utf8")
);

const dirname = path.join(__dirname);

const nextServer = new NextServer({
  hostname: "localhost",
  port: 3000,
  dir: dirname,
  dev: false,
  // @ts-ignore
  conf: {
    ...requiredServerFiles.config,
    // Assume this lambda sits behind a CF distro that
    // will compress all the things:
    compress: false,
  },
});

export const handler = serverless(nextServer.getRequestHandler(), {
  // enable binary support for all content types:
  binary: ["*/*"],
});
