$version: "2"
namespace com.weekly.budgeter.operation

use com.weekly.budgeter.common#AllowedUsers
use com.weekly.budgeter.common#BudgetId
use com.weekly.budgeter.common#BudgetName
use com.weekly.budgeter.common#WeeklyLimit
use com.weekly.budgeter.common#ClientToken

@documentation("Creates a new budget.")
@idempotent
@http(method: "POST", uri: "/budgets")
operation CreateBudget {
    input: CreateBudgetRequest,
    output: CreateBudgetResponse,
    errors: [] // TODO: Create Errors
}

@documentation("Input for creating a new budget")
@input
structure CreateBudgetRequest {

    @documentation("Name of the new budget.")
    @required
    name: BudgetName,

    @documentation("Weekly spending limit.")
    @required
    limit: WeeklyLimit,

    @documentation("Users with access to this API")
    @required
    allowedUsers: AllowedUsers,

    @required
    @idempotentcyToken
    clientToken: ClientToken,
}

@documentation("The response from creating a new budget")
@output
structure CreateBudgetResponse {
    
    @documentation("Name of the created budget.")
    @required
    name: BudgetName,

    @documentation("Id of the created budget.")
    @required
    id: BudgetId,
}
