//if API errors takes place then This will run 
//we just have overwrite the api errors with is present in the nodejs

class apiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        statck = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.data = null;
        this.success = false;

        if(statck) {
        this.statck = statck;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { apiError }