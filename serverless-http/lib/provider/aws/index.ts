import cleanUpEvent from "./clean-up-event";

import createRequest from "./create-request";
import formatResponse from "./format-response";

// @ts-ignore
export default function aws(options) {
  // @ts-ignore
  return (getResponse) =>
    // @ts-ignore
    async (event_, context = {}) => {
      const event = cleanUpEvent(event_, options);

      const request = createRequest(event, context, options);
      const response = await getResponse(request, event, context);

      return formatResponse(event, response, options);
    };
}
