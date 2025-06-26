export type UserInformationError = {
    name?: string[],
    email?: string[],
    password?: string[],
    password_confirmation?: string[],
    post_code?: string[],
    address?: string[],
    building?: string[],
    image?: string[],
}

export type ItemError = {
    image?: string[],
    category_id?: string[],
    condition?: string[],
    name?: string[],
    brand?: string[],
    description?: string[],
    price?: string[],
}