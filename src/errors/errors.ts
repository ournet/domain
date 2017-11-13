
export class OurnetError extends Error {
    constructor(message: string, public statusCode: number = 500) {
        super(message);

        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }
}

export class CodeError extends OurnetError {
    constructor(message: string = 'Code error', statusCode: number = 500) {
        super(message, statusCode);
    }
}

export class DataError extends OurnetError { }

export class DataConflictError extends DataError {
    constructor(message: string = 'Data conflict error', statusCode: number = 409) {
        super(message, statusCode);
    }
}

export class DataValidationError extends DataError {
    constructor(message: string = 'Validation error', statusCode: number = 400) {
        super(message, statusCode);
    }
}

export class DataNotFoundError extends DataValidationError {
    constructor(message: string = 'Data not found', statusCode: number = 404) {
        super(message, statusCode);
    }
}
