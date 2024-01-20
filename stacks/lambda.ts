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

        this.lambdaHandlers.set("ListBudgets", this.createDummyHandler("ListBudgets", `
            exports.handler = async (event) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        "budgets": [],
                    }),
                };
            };
        `));
        this.lambdaHandlers.set("CreateBudget", this.createDummyHandler("CreateBudget", `
            exports.handler = async (event) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        "name": "FooBar",
                        "id": "b-abc4567890123456",
                    }),
                };
            };
        `));
        this.lambdaHandlers.set("DeleteBudget", this.createDummyHandler("DeleteBudget", `
            exports.handler = async (event) => {
                return {
                    statusCode: 200,
                };
            };
        `));
        this.lambdaHandlers.set("DescribeBudget", this.createDummyHandler("DescribeBudget", `
            exports.handler = async (event) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        "budget": {
                            "budgetId": "b-1234567890123456",
                            "name": "FooBar",
                            "limit": 10000,
                            "allowedUsers": ["test@test.com"],
                        },
                        expenses: [],
                    }),
                };
            };
        `));
        this.lambdaHandlers.set("UpdateBudget", this.createDummyHandler("UpdateBudget", `
            exports.handler = async (event) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        "budget": {
                            "budgetId": "b-1234567890123456",
                            "name": "FooBar",
                            "limit": 10000,
                            "allowedUsers": ["test@test.com"],
                        },
                    }),
                };
            };
        `));
        this.lambdaHandlers.set("CreateExpense", this.createDummyHandler("CreateExpense", `
            exports.handler = async (event) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        "expenseDescription": "The new Nickleback Album",
                        "expenseId": "e-1234567890123456"
                    }),
                };
            };
        `));
        this.lambdaHandlers.set("DeleteExpense", this.createDummyHandler("DeleteExpense", `
            exports.handler = async (event) => {
                return {
                    statusCode: 200,
                };
            };
        `));
        this.lambdaHandlers.set("UpdateExpense", this.createDummyHandler("UpdateExpense", `
            exports.handler = async (event) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        "expense": {
                            "expenseId": "e-1234567890123456",
                            "expenseDate": 0,
                            "expenseDescription": "Beer",
                            "exenseAmoundCents": 500,
                            "expenseState": "PAID",
                        },
                    }),
                };
            };
        `));       
    }

    private createDummyHandler(handlerName: string, handlerCode: string): Function {
        const handler = new Function(this, handlerName, {
            runtime: Runtime.NODEJS_18_X,
            code: Code.fromInline(handlerCode), // TODO: Update to point to handlers directory
            handler: 'index.handler',
            timeout: Duration.seconds(10),           
        });

        handler.role?.grantAssumeRole(new ServicePrincipal('apigateway.amazonaws.com'));

        return handler;
    }
}