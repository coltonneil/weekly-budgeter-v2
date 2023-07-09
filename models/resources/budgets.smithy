$version: "2"
namespace com.weekly.budgeter.resources

use com.weekly.budgeter.operation#DeleteBudget
use com.weekly.budgeter.operation#UpdateBudget
use com.weekly.budgeter.common#BudgetBudgetId
use com.weekly.budgeter.operation#CreateBudget
use com.weekly.budgeter.operation#ListBudgets
use com.weekly.budgeter.operation#DescribeBudget

resource Budget {
    identifiers: { budgetId: BudgetId },
    create: CreateBudget,
    update: UpdateBudget,
    delete: DeleteBudget,
    list: ListBudgets,
    operations: [
        DescribeBudget
    ]
}