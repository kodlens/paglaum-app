import { LoanSubtype } from "./loanSubtype";

export interface Loan {
    id?: number;
    user_id: number;
    purpose: string;
    principal: number;
    data?: any[],
    loan_type_id?: number|string;
    loan_subtype_id?: number|string;
    loan_type?: string;
    loan_subtype?: string;
    // loan_subtypes: LoanSubtype[]
    // loan_subtypes: LoanSubtype[]
    interest: number;
    terms_month: number;
    active?: number;
    updated_at?: Date|unknown;
    created_at?: Date|unknown;
}