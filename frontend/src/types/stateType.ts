export type UserInformationError = {
    name?: string[],
    email?: string[],
    password?: string[],
    password_confirmation?: string[],
    post_code?: string[],
    address?: string[],
    building?: string[],
    image?: string[],
    brand?: string[],
    price?: string[],
    category_id?: string[],
    state?: string[],
    description?: string[],
}

export type Category = {
    id: number,
    content: string,
    checked: boolean,
}

export type State = {
    value: number,
    label: string,
}

export type ItemType = {
    id: number,
    name: string,
    image: string,
    sold_at: string,
}

export type ItemDetailType = {
    id: number,
    name: string,
    brand: string | null,
    description: string,
    price: number,
    state: string,
    image: string,
    sold_at: string | null,
    categories: string[],
}