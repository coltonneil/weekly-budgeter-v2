import { APIGatewayProxyEvent } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent){
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
}
}