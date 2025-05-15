import { LoanSubtype } from "./loanSubtype";
import { LoanDetail } from "./loanDetail";

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
    loan_details?: LoanDetail[];
    // loan_subtypes: LoanSubtype[]
    // loan_subtypes: LoanSubtype[]
    interest?: number;
    terms_month?: number;
    co_maker?: string;
    mode_payment?: string;
    active?: number;
    is_do_approve?:number;
    is_bm_approve?:number;
    co_maker_signature?: string | undefined;
    kyc_id?: string | undefined;
    co_maker_identification?: string | undefined;
    signature?: string | undefined;
    insurance_type_id?: number;
    insurance_type_agebrakcet_id?: number;
    insurance_payment?: number;
    total_amount?: number;
    shared?: number;
    updated_at?: Date|unknown;
    created_at?: Date|unknown;
}
