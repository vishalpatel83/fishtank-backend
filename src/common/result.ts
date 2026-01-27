export class ResultModal<T> {
    result = {
        data: {} as T,
        message: '',
        status: 200,
        isSuccess: true,
        errormessage: '',
    };

    constructor(
        data: T,
        message: string,
        status: number,
        isSuccess: boolean,
        errormessage: string,
    ) {
        this.result.data = data;
        this.result.message = message;
        this.result.status = status;
        this.result.isSuccess = isSuccess;
        this.result.errormessage = errormessage;
    }
}
