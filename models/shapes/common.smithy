$version: "2"
namespace com.weekly.budgeter.common

@documentation("A token used to implement idempotentcy")
string ClientToken

@documentation("A token used to for querying the next page of results")
string NextToken

@documentation("A the max number of results to return in a query.")
@range(min: 1, max: 100)
integer MaxResults


@documentation("The date range to grab the expenses within.")
structure DateRange {
    @required
    startDate: Timestamp,

    @required
    endDate: Timestamp,
}
