export interface LoanSubtype {
    id?: number;
    data?: any[],
    loan_type?: string;
    loan_type_id?: number;
    loan_subtype?: string;
    term_month?: number;
    terms_month?:number;
    percent?: number;
    active?: number;
    updated_at?: Date|unknown;
    created_at?: Date|unknown;
}