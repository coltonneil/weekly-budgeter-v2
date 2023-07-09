$version: "2"
namespace com.weekly.budgeter.operation

use com.weekly.budgeter.common#AllowedUsers
use com.weekly.budgeter.common#Budget
use com.weekly.budgeter.common#BudgetId
use com.weekly.budgeter.common#BudgetName
use com.weekly.budgeter.common#WeeklyLimit

@documentation("Creates an existing budget.")
@http(method: "POST", uri: "/budgets/{budgetId}")
operation UpdateBudget {
    input: UpdateBudgetRequest,
    output: UpdateBudgetResponse,
    errors: [] // TODO: Create Errors
}

@documentation("Input for updating a budget")
@input
structure UpdateBudgetRequest {

    @documentation("Id of the created budget.")
    @httpLabel
    @required
    budgetId: BudgetId,

    @documentation("Name to update the budget to.")
    @required
    name: BudgetName,

    @documentation("Weekly spending limit to update the budget to. NOTE: This will retroactively apply this budget limit to previous weeks.")
    @required
    limit: WeeklyLimit,

    @documentation("Users with access to this API")
    @required
    allowedUsers: AllowedUsers,
}

@documentation("The response from updating a budget")
@output
structure UpdateBudgetResponse {
    
    @documentation("Newly updated budget.")
    @required
    budget: Budget,
}
