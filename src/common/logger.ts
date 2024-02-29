export interface Logger {
    log(message: string): void;

    info(message: string): void;

    error(message: string): void;

    warning(message: string): void;

    success(message: string): void;
}