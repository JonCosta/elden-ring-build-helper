interface Attribute {
    name: string;
    amount: number;
}

export interface Item {
    id: string;
    name: string;
    image: string;
    requiredAttributes?: Attribute[];
    requires?: Attribute[];
}