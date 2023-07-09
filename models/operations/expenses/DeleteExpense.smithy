$version: "2"
namespace com.weekly.budgeter.operation

use com.weekly.budgeter.common#BudgetId

@documentation("Creates an expense.")
@idempotent
@http(method: "DELETE", uri: "/budgets/{budgetId}/expenses/{expenseId}")
operation DeleteExpense {
    input: DeleteExpenseRequest,
    output: DeleteExpenseResponse,
    errors: [] // TODO: Create Errors
}

@documentation("Input for deleting an expense.")
@input
structure DeleteExpenseRequest {

    @documentation("Id of the budget of the expense to delete.")
    @httpLabel
    @required
    budgetId: BudgetId,

    @documentation("Id of the expense to delete.")
    @httpLabel
    @required
    expenseId: ExpenseId,
}

@documentation("The response from deleting a budget.")
@output
structure DeleteExpenseResponse {
}
