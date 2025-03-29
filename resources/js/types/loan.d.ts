import { LoanSubtype } from "./loanSubtype";

export interface Loan {
    id?: number;
    user_id?: number;
    purpose?: string;
    principal?: number;
    data?: any[],
    loan_type_id?: number|string|null;
    loan_subtype_id?: number|string|null;
    loan_type?: string;
    loan_subtype?: string;
    user?: User;
    // loan_subtypes: LoanSubtype[]
    // loan_subtypes: LoanSubtype[]
    interest?: number;
    terms_month?: number;
    guarantor?: string;
    mode_payment?: string;
    active?: number;
    is_do_approve?:number;
    is_bm_approve?:number;
    updated_at?: Date|unknown;
    created_at?: Date|unknown;
}
