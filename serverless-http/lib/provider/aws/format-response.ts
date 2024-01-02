"use strict";

import isBinary from "./is-binary";
// @ts-ignore
import Response from "../../response";
import sanitizeHeaders from "./sanitize-headers";
// @ts-ignore
import { getEventType, LAMBDA_EVENT_TYPES } from "./get-event-type";

// @ts-ignore
const combineHeaders = (headers, multiValueHeaders) => {
  return Object.entries(headers).reduce((memo, [key, value]) => {
    if (multiValueHeaders[key]) {
      memo[key].push(value);
    } else {
      memo[key] = [value];
    }
    return memo;
  }, multiValueHeaders);
};

// @ts-ignore
export default function formatResponse(event, response, options) {
  const eventType = getEventType(event);
  const { statusCode } = response;
  const { headers, multiValueHeaders } = sanitizeHeaders(
    Response.headers(response)
  );

  let cookies = [];

  // @ts-ignore
  if (multiValueHeaders["set-cookie"]) {
    // @ts-ignore
    cookies = multiValueHeaders["set-cookie"];
  }

  const isBase64Encoded = isBinary(headers, options);
  const encoding = isBase64Encoded ? "base64" : "utf8";
  let body = Response.body(response).toString(encoding);

  // @ts-ignore
  if (headers["transfer-encoding"] === "chunked" || response.chunkedEncoding) {
    const raw = Response.body(response).toString().split("\r\n");
    const parsed = [];
    for (let i = 0; i < raw.length; i += 2) {
      const size = parseInt(raw[i], 16);
      const value = raw[i + 1];
      if (value) {
        parsed.push(value.substring(0, size));
      }
    }
    body = parsed.join("");
  }

  if (eventType === LAMBDA_EVENT_TYPES.ALB) {
    const albResponse = { statusCode, isBase64Encoded, body };
    if (event.multiValueHeaders) {
      // @ts-ignore
      albResponse.multiValueHeaders = combineHeaders(
        headers,
        multiValueHeaders
      );
    } else {
      // @ts-ignore
      albResponse.headers = headers;
    }
    return albResponse;
  }

  if (eventType === LAMBDA_EVENT_TYPES.HTTP_API_V2) {
    return { statusCode, isBase64Encoded, body, headers, cookies };
  }

  // HTTP_API_V1 is the default
  return { statusCode, isBase64Encoded, body, headers, multiValueHeaders };
}
