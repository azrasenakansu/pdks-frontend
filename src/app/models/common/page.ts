export interface Page<T> {
    content: T[];
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    empty: boolean;
}