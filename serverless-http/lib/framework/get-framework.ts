"use strict";

import * as http from "http";
import Response from "../response";

// @ts-ignore
function common(cb) {
  // @ts-ignore
  return (request) => {
    const response = new Response(request);

    cb(request, response);

    return response;
  };
}

// @ts-ignore
export default function getFramework(app) {
  if (app instanceof http.Server) {
    // @ts-ignore
    return (request) => {
      const response = new Response(request);
      app.emit("request", request, response);
      return response;
    };
  }

  if (typeof app.callback === "function") {
    return common(app.callback());
  }

  if (typeof app.handle === "function") {
    // @ts-ignore
    return common((request, response) => {
      app.handle(request, response);
    });
  }

  if (typeof app.handler === "function") {
    // @ts-ignore
    return common((request, response) => {
      app.handler(request, response);
    });
  }

  if (typeof app._onRequest === "function") {
    // @ts-ignore
    return common((request, response) => {
      app._onRequest(request, response);
    });
  }

  if (typeof app === "function") {
    return common(app);
  }

  if (app.router && typeof app.router.route == "function") {
    // @ts-ignore
    return common((req, res) => {
      const { url, method, headers, body } = req;
      app.router.route({ url, method, headers, body }, res);
    });
  }

  if (app._core && typeof app._core._dispatch === "function") {
    return common(
      app._core._dispatch({
        app,
      })
    );
  }

  if (typeof app.inject === "function") {
    // @ts-ignore
    return async (request) => {
      const { method, url, headers, body } = request;

      const res = await app.inject({ method, url, headers, payload: body });

      return Response.from(res);
    };
  }

  if (typeof app.main === "function") {
    return common(app.main);
  }

  throw new Error("Unsupported framework");
}
