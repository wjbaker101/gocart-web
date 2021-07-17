export interface ApiResponse<T> {
    result: T,
    error: string,
    timestamp: number,
}
