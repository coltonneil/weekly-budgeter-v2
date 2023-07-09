$version: "2"
namespace com.weekly.budgeter

use com.weekly.budgeter.resources#Budget
use com.weekly.budgeter.resources#Expense

@documentation("Handles the storing and processing of budgets and expenses.")
service WeeklyBudgeter {
    version: "2023-07-08",
    resources: [
        Budget,
        Expense,
    ]
}
