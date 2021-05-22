import {CustomError} from './custom-error'
export class DatabaseConnectionError extends CustomError {
    public reason: string = 'Failed to connect to database'
    statusCode = 500
    constructor(){
        super("DatabaseConnectionError")
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [{message: this.reason}]
    }

    
}