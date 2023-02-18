export type friends = {
    id: string,
    user_1_id: string,
    user_2_id: string
}

export interface FriendsInputDTO {
    user_1_id: string,
    user_2_id: string
}