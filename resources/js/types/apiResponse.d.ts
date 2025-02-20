import { User } from ".";

export interface PaginateResponse {
    data: User[],
    total: number;
}
