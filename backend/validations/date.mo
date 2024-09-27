import Result "mo:base/Result";
import DateTime "mo:datetime/DateTime";
import Order "mo:base/Order";


module{
    private type DateError = {
        #InvalidDate
    };

    private type SuccessDate = {
        #Date : Text;
    };

    public type DateResult = Result.Result<SuccessDate, DateError>;
}