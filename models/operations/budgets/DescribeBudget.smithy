$version: "2"
namespace com.weekly.budgeter.operation

use com.weekly.budgeter.common#NextToken
use com.weekly.budgeter.common#MaxResults
use com.weekly.budgeter.common#Budgets
use com.weekly.budgeter.common#BudgetId
use com.weekly.budgeter.common#DateRange
use com.weekly.budgeter.common#Expenses


@documentation("Gets the data on a budget, and returns a paginated list of Expenses.")
@http(method: "GET", uri: "/budgets/{budgetId}")
@paginated(
    inputToken: "nextToken", 
    outputToken: "nextToken",
    pageSize: "maxResults", 
    items: "expenses"
)
@readonly
operation DescribeBudget {
    input: DescribeBudgetRequest,
    output: DescribeBudgetResponse,
    errors: [], // TODO: Implement Errors
}

@input
structure DescribeBudgetRequest {

    @required
    @httpLabel
    budgetId: BudgetId,

    @documentation("Date range to grab expenses within, if not provided, will query all available expenses in budget.")
    @httpQuery
    dateRange: DateRange,

    @default(100)
    @httpQuery
    maxResults: MaxResults,

    @httpQuery
    nextToken: NextToken,

}

@output
structure DescribeBudgetResponse {

    nextToken: NextToken,

    @required
    budget: Budget,

    @required
    @length(min: 0, max: 100)
    expenses: Expenses,
}