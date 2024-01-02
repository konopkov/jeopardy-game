"use strict";

import * as http from "http";

const headerEnd = "\r\n\r\n";

const BODY = Symbol();
const HEADERS = Symbol();

// @ts-ignore
function getString(data) {
  if (Buffer.isBuffer(data)) {
    return data.toString("utf8");
  } else if (typeof data === "string") {
    return data;
  } else {
    throw new Error(`response.write() of unexpected type: ${typeof data}`);
  }
}

// @ts-ignore
function addData(stream, data) {
  if (
    Buffer.isBuffer(data) ||
    typeof data === "string" ||
    data instanceof Uint8Array
  ) {
    stream[BODY].push(Buffer.from(data));
  } else {
    throw new Error(`response.write() of unexpected type: ${typeof data}`);
  }
}

export default class ServerlessResponse extends http.ServerResponse {
  // @ts-ignore
  static from(res) {
    const response = new ServerlessResponse(res);

    response.statusCode = res.statusCode;
    // @ts-ignore
    response[HEADERS] = res.headers;
    // @ts-ignore
    response[BODY] = [Buffer.from(res.body)];
    response.end();

    return response;
  }

  // @ts-ignore
  static body(res) {
    return Buffer.concat(res[BODY]);
  }

  // @ts-ignore
  static headers(res) {
    const headers =
      typeof res.getHeaders === "function" ? res.getHeaders() : res._headers;

    return Object.assign(headers, res[HEADERS]);
  }

  get headers() {
    // @ts-ignore
    return this[HEADERS];
  }

  // @ts-ignore
  setHeader(key, value) {
    // @ts-ignore
    if (this._wroteHeader) {
      // @ts-ignore
      this[HEADERS][key] = value;
    } else {
      super.setHeader(key, value);
    }
  }

  // @ts-ignore
  writeHead(statusCode, reason, obj) {
    const headers = typeof reason === "string" ? obj : reason;

    for (const name in headers) {
      this.setHeader(name, headers[name]);

      // @ts-ignore
      if (!this._wroteHeader) {
        // we only need to initiate super.headers once
        // writeHead will add the other headers itself
        break;
      }
    }

    super.writeHead(statusCode, reason, obj);
  }

  // @ts-ignore
  constructor({ method }) {
    // @ts-ignore
    super({ method });

    // @ts-ignore
    this[BODY] = [];
    // @ts-ignore
    this[HEADERS] = {};

    this.useChunkedEncodingByDefault = false;
    this.chunkedEncoding = false;
    // @ts-ignore
    this._header = "";

    this.assignSocket({
      _writableState: {},
      writable: true,
      // @ts-ignore
      on: Function.prototype,
      // @ts-ignore
      removeListener: Function.prototype,
      // @ts-ignore
      destroy: Function.prototype,
      // @ts-ignore
      cork: Function.prototype,
      // @ts-ignore
      uncork: Function.prototype,
      // @ts-ignore
      write: (data, encoding, cb) => {
        if (typeof encoding === "function") {
          cb = encoding;
          // @ts-ignore
          encoding = null;
        }

        // @ts-ignore
        if (this._header === "" || this._wroteHeader) {
          addData(this, data);
        } else {
          const string = getString(data);
          const index = string.indexOf(headerEnd);

          if (index !== -1) {
            const remainder = string.slice(index + headerEnd.length);

            if (remainder) {
              addData(this, remainder);
            }

            // @ts-ignore
            this._wroteHeader = true;
          }
        }

        if (typeof cb === "function") {
          cb();
        }
        return true;
      },
    });
  }
}
