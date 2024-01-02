"use strict";

import * as http from "http";

export default class ServerlessRequest extends http.IncomingMessage {
  // @ts-ignore
  constructor({ method, url, headers, body, remoteAddress }) {
    super({
      encrypted: true,
      readable: false,
      remoteAddress,
      address: () => ({ port: 443 }),
      // @ts-ignore
      end: Function.prototype,
      // @ts-ignore
      destroy: Function.prototype,
    });

    // @ts-ignore
    if (typeof headers["content-length"] === "undefined") {
      headers["content-length"] = Buffer.byteLength(body);
    }

    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: "1.1",
      httpVersionMajor: "1",
      httpVersionMinor: "1",
      method,
      headers,
      body,
      url,
    });

    this._read = () => {
      this.push(body);
      this.push(null);
    };
  }
}
