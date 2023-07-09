$version: "2"
namespace com.weekly.budgeter.common

@documentation("The ID of an expense.")
string ExpenseId

@documentation("When an expense occured.")
timestamp ExpenseDate

@documentation("The amount an expense cost, in number of cents.")
@range(min: 0)
integer ExpenseAmountCents

@documentation("Description of expense.")
@length(min: 1, max: 140)
string ExpenseDescription

@documentation("Describes whether this expense has happened, or will happen.")
enum ExpenseState {
    @documentation("The expense has not yet been realized.")
    PLANNED = "PLANNED",

    @documentation("The expense has been realized.")
    PAID = "PAID",
}

structure Expense {
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

@length(min: 0, max: 100)
list Expenses {
    member: Expense,
}
