interface Attribute {
    name: string,
    amount: number
}

export interface ResponseData {
    id: string,
    name: string,
    image: string,
    requiredAttributes?: Attribute[],
    requires?: Attribute[]
}

export interface ApiResponse {
    success: boolean,
    count: number,
    data: ResponseData[]
}