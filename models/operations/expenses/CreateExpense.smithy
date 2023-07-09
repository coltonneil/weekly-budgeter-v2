$version: "2"
namespace com.weekly.budgeter.operation

use com.weekly.budgeter.common#AllowedUsers
use com.weekly.budgeter.common#BudgetId
use com.weekly.budgeter.common#BudgetName
use com.weekly.budgeter.common#WeeklyLimit
use com.weekly.budgeter.common#ClientToken
use com.weekly.budgeter.common#ExpenseId
use com.weekly.budgeter.common#ExpenseDescription

@documentation("Creates a new expense.")
@idempotent
@http(method: "POST", uri: "/budgets/{budgetId}/expenses")
operation CreateExpense {
    input: CreateExpenseRequest,
    output: CreateExpenseResponse,
    errors: [] // TODO: Create Errors
}

@documentation("Input for creating a new budget")
@input
structure CreateExpenseRequest {

    @documentation("Name of the new budget.")
    @required
    @httpLabel
    budgetId: BudgetId,

    @required
    expenseDate: ExpenseDate,

    @required
    expenseDescription: ExpenseDescription,

    @required
    expenseAmoundCents: ExpenseAmountCents,

    @required
    expenseState: ExpenseState,

    @required
    @idempotentcyToken
    clientToken: ClientToken,
}

@documentation("The response from creating a new expense")
@output
structure CreateExpenseResponse {
    
    @documentation("Description of the new expense.")
    @required
    expenseDescription: ExpenseDescription,

    @documentation("Id of the created budget.")
    @required
    expenseId: ExpenseId,
}
