"use strict";

import finish from "./lib/finish";
import getFramework from "./lib/framework/get-framework";
import getProvider from "./lib/provider/get-provider";

const defaultOptions = {
  requestId: "x-request-id",
};

// @ts-ignore
export default function serverless(app, opts) {
  const options = Object.assign({}, defaultOptions, opts);

  const framework = getFramework(app);
  const provider = getProvider(options);

  // @ts-ignore
  return provider(async (request, ...context) => {
    console.log(JSON.stringify(request));
    console.log(JSON.stringify(context));
    await finish(request, options.request, ...context);
    const response = await framework(request);
    await finish(response, options.response, ...context);
    response.emit("close");
    return response;
  });
}
