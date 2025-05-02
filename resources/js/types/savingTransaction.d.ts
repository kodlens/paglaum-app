export interface SavingTransaction {
    id?: number;
    data?: any[],
    saving_account_id: number;
    transaction_type: string;
    remarks: string;
    amount: number;
    balance: number;
    updated_at: Date;
    created_at: Date;
  }

