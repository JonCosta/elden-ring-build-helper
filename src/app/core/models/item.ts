export interface ItemRequirements {
    str: number,
    dex: number,
    fai: number,
    int: number,
    arc: number
}

export interface Item {
    id: string,
    name: string,
    image: string,
    requirements: ItemRequirements
}