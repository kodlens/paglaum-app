import { LoanSubtype } from "./loanSubtype";

export interface LoanType {
    id?: number;
    data?: any[],
    loan_type?: string;
    loan_subtypes: LoanSubtype[]
    active?: number;
    updated_at?: Date|unknown;
    created_at?: Date|unknown;
}