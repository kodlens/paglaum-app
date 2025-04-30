export interface SavingsAccount {
  id?: number;
  data?: any[],
  user: {
    lname: string;
    fname: string;
    mname: string;
    sex: string;
  };
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
