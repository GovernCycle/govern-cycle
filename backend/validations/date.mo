import Result "mo:base/Result";
import DateTime "mo:datetime/DateTime";
import Order "mo:base/Order";

module {
    
    // Private type to represent errors related to date operations.
    // #InvalidDate: Represents an error where the date provided is not valid.
    private type DateError = {
        #InvalidDate
    };

    // Private type to represent a successful date operation.
    // #Date: Holds a Text value representing the formatted date.
    private type SuccessDate = {
        #Date: Text;
    };

    // Public type to represent the result of a date-related operation.
    // Uses the Result module to return either a SuccessDate or a DateError.
    // - Result<SuccessDate, DateError>: 
    //     - SuccessDate contains the valid date.
    //     - DateError contains an error if the date is invalid.
    public type DateResult = Result.Result<SuccessDate, DateError>;
}
