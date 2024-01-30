import {Duration, Stack} from "aws-cdk-lib/core";
import {Construct} from "constructs";
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { ServicePrincipal } from "aws-cdk-lib/aws-iam";

export class ApiHandlerStack extends Stack {
    lambdaHandlers: Map<string, Function>;


    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.lambdaHandlers = new Map<string, Function>();

        this.lambdaHandlers.set("ListBudgets", this.createHandler("ListBudgets", "./packages/functions/src/list-budgets"));
        this.lambdaHandlers.set("CreateBudget", this.createHandler("CreateBudget", "./packages/functions/src/create-budget"));
        this.lambdaHandlers.set("DeleteBudget", this.createHandler("DeleteBudget", "./packages/functions/src/delete-budget"));
        this.lambdaHandlers.set("DescribeBudget", this.createHandler("DescribeBudget", "./packages/functions/src/describe-budget"));
        this.lambdaHandlers.set("UpdateBudget", this.createHandler("UpdateBudget", "./packages/functions/src/update-budget"));
        this.lambdaHandlers.set("CreateExpense", this.createHandler("CreateExpense", "./packages/functions/src/create-expense"));
        this.lambdaHandlers.set("DeleteExpense", this.createHandler("DeleteExpense", "./packages/functions/src/delete-expense"));
        this.lambdaHandlers.set("UpdateExpense", this.createHandler("UpdateExpense", "./packages/functions/src/update-expense"));       
    }

/*     private createDummyHandler(handlerName: string, handlerCode: string): Function {
        const handler = new Function(this, handlerName, {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromInline(handlerCode), // TODO: Update to point to handlers directory
            handler: 'index.handler',
            timeout: Duration.seconds(10),           
        });

        handler.role?.grantAssumeRole(new ServicePrincipal('apigateway.amazonaws.com'));

        return handler;
    } */

    private createHandler(handlerName: string, handlerPath: string): Function {
        const handler = new Function(this, handlerName, {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromAsset(handlerPath), // TODO: Update to point to handlers directory
            handler: 'index.handler',
            timeout: Duration.seconds(10),           
        });

        handler.role?.grantAssumeRole(new ServicePrincipal('apigateway.amazonaws.com'));

        return handler;
    }
}