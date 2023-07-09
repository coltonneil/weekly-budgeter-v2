$version: "2"
namespace com.weekly.budgeter.operation

use com.weekly.budgeter.common#NextToken
use com.weekly.budgeter.common#MaxResults
use com.weekly.budgeter.common#Budgets



@documentation("Queries for the availble Budgets.")
@http(method: "GET", uri: "/budgets")
@paginated(
    inputToken: "nextToken", 
    outputToken: "nextToken",
    pageSize: "maxResults", 
    items: "budgets"
)
@readonly
operation ListBudgets {
    input: ListBudgetsRequest,
    output: ListBudgetsResponse,
    errors: [], // TODO: Implement Errors
}

@input
structure ListBudgetsRequest {

    @default(100)
    maxResults: MaxResults,

    nextToken: NextToken,

}

@output
structure ListBudgetsResponse {

    nextToken: NextToken,

    @required
    @length(min: 0, max: 100)
    budgets: Budgets,
}
