export interface Page<T> {
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    pageSize: number;
    content: T[];
    pageNumber: number;
    numberOfElements: number;
    ascending: boolean;
    empty: boolean;
}
