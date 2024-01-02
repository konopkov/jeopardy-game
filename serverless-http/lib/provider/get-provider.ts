import aws from "./aws";

const providers = {
  aws,
};

// @ts-ignore
export default function getProvider(options) {
  const { provider = "aws" } = options;

  if (provider in providers) {
    // @ts-ignore
    return providers[provider](options);
  }

  throw new Error(`Unsupported provider ${provider}`);
}
// @ts-ignore
