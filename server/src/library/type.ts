export interface Err extends Error {
    status: string;
    statusCode: number;
    isOperational: boolean;
    value?: string;
    path?: string;
    code?: number;
    keyValue?: {
        [key: string]: number;
    };
    errors?: {
        [key: string]: any;
    };
    _message?:string
}
