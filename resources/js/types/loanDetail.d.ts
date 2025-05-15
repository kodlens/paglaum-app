export interface LoanDetail {
    id?: number;
    data?: any[],
    loan_id: number;
    month: number;
    user_id: number;
    due_date: Date;
    datetime_paid: DateTime;
    amount: number;
    amount_paid: number;
    is_paid: number;
    ref: string;
    payment_method: string;
    payment_transaction: string;
    payment_session: string;
    active: number;
    insurance_payment?: number;
    total_amount?: number;
    shared?: number;
    updated_at: Date|unknown;
    created_at: Date|unknown;
}