export interface SavingsAccount {
  id?: number;
  data?: any[],
  user_id?: number;
  user: {
    id: number;
    lname: string;
    fname: string;
    mname: string;
    sex: string;
  };
  saving_transactions: [{
    id:number;
    saving_account_id: number;
    transaction_type:number;
    remarks: string;
    amount:number;
    updated_at: Date;
    created_at: Date;
  
  }]
  account_no?: string;
  account_name: string;
  account_type: string;
  balance: number;
  interest_rate: number;
  is_active?: number;
  is_approved?: number;
  opened_at?: DateTime;
  closed_at?: DateTime;
  updated_at?: Date;
  created_at?: Date;
}
