import type { SSTConfig } from "sst";
import { StackContext, SvelteKitSite } from "sst/constructs";
import {ApiStack} from "./stacks/api";
import {ApiHandlerStack} from "./stacks/lambda";
import {CognitoStack} from "./stacks/cognito";

export default {
  config(_input) {
    return {
      name: "weekly-budgeter-v2",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Stack({ stack }: StackContext) {

      const apiHandler = new ApiHandlerStack(app, `ApiHandler-${app.stage}`);
      const cognito = new CognitoStack(app, `Cognito-${app.stage}`);

      const api = new ApiStack(app, `ApiGatway-${app.stage}`, {
        region: stack.region,
        lambdaHandlers: apiHandler.lambdaHandlers,
        userPoolArn: cognito.userPoolArn,
      });
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
