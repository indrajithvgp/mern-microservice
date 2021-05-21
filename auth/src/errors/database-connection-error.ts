export class DatabaseConnectionError extends Error {
    // private error: String = 'Failed to connect to database'
    constructor(private error: String){
        super()
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    
}