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

export type CommentType = {
    user_name: string,
    user_img: string,
    comment: string,
    comment_id: number,
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
    is_like: boolean,
    likes_count: number,
    comments: CommentType[],
    comments_count: number,
}

export type CommentErrorType = {
    comment?: string[],
}

export type PaymentMethodType = {
    value: number,
    label: string,
}

export type  ShippingAddressType = {
    post_code: string,
    address: string,
    building: string,
}

export type PurchaseInfoType = {
    id: number,
    name: string,
    price: number,
    image: string,
    payment_methods: PaymentMethodType[],
    shipping_address: ShippingAddressType,
}

export type PurchaseErrorType = {
    payment_method?: string[],
    post_code?: string[],
    address?: string[],
    building?: string[],
}

export type MypageProfileType = {
    image: string,
    name: string,
}

export type ValidationErrorsType = {
    errors: Record<string, string[]>;
}

type PurchaseType = {
    id: number;
}

export type TransactionType = {
    name: string;
    image: string;
    sold_at: string;
    purchase: PurchaseType;
    unread_count?: number;
}

export type TransactionPartnerType = {
    partner_name: string;
    partner_image: string | null;
}

export type OtherTransactionsType = {
    name: string;
    purchase: PurchaseType;
}

export type TransactionItemType = {
    item_name: string;
    item_price: number;
    item_image: string;
    item_seller_id: number;
    transaction_complete_flg: number;
}

export type TransactionChatType = {
    user_id: number;
    user_name: string;
    user_image: string | null;
    chat_id: number;
    chat_message: string;
    chat_image: string | null;
}