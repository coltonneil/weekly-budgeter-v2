import type { SSTConfig } from "sst";
import { StackContext, SvelteKitSite } from "sst/constructs";
import {ApiStack} from "./stacks/api";

export default {
  config(_input) {
    return {
      name: "weekly-budgeter-v2",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Stack({ stack }: StackContext) {
      const api = new ApiStack(app, `ApiGatway-${app.stage}`);
      stack.addDependency(api);
    })
    app.stack(function Site({ stack }) {
      const site = new SvelteKitSite(stack, "site");
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
