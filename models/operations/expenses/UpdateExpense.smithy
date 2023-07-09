$version: "2"
namespace com.weekly.budgeter.operation

use com.weekly.budgeter.common#AllowedUsers
use com.weekly.budgeter.common#Budget
use com.weekly.budgeter.common#BudgetId
use com.weekly.budgeter.common#BudgetName
use com.weekly.budgeter.common#WeeklyLimit

@documentation("Updates an existing expense.")
@http(method: "POST", uri: "/budgets/{budgetId}/expenses/{expenseId}")
operation UpdateExpense {
    input: UpdateExpenseRequest,
    output: UpdateExpenseResponse,
    errors: [] // TODO: Create Errors
}

@documentation("Input for updating a budget")
@input
structure UpdateExpenseRequest {

    @documentation("Id of the budget of the expense to update.")
    @httpLabel
    @required
    budgetId: BudgetId,

    @documentation("Id of the expense to update.")
    @httpLabel
    @required
    expenseId: ExpenseId,

     @required
    expenseDate: ExpenseDate,

    @required
    expenseDescription: ExpenseDescription,

    @required
    expenseAmoundCents: ExpenseAmountCents,

    @required
    expenseState: ExpenseState,
}

@documentation("The response from updating an expense")
@output
structure UpdateExpenseResponse {
    
    @documentation("Newly updated expense.")
    @required
    expense: Expense,
}
