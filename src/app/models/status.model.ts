export interface Status {
    code: number|null;
    messages: Map<number, string>;
    tittles: Map<boolean, string>;
}