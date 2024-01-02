"use strict";

// @ts-ignore
export default function sanitizeHeaders(headers) {
  return Object.keys(headers).reduce(
    (memo, key) => {
      const value = headers[key];

      if (Array.isArray(value)) {
        // @ts-ignore
        memo.multiValueHeaders[key] = value;
        if (key.toLowerCase() !== "set-cookie") {
          // @ts-ignore
          memo.headers[key] = value.join(", ");
        }
      } else {
        // @ts-ignore
        memo.headers[key] = value == null ? "" : value.toString();
      }

      return memo;
    },
    {
      headers: {},
      multiValueHeaders: {},
    }
  );
}
