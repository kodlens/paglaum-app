import { InsuranceTypeAgeBracket } from "./insuranceTypeAgeBracket";

export interface InsuranceType {
    id?: number;
    data?: any[],
    insurance_type?: string;
    insurance_types_agebrackets: InsuranceTypeAgeBracket[]
    is_active?: number;
    updated_at?: Date|unknown;
    created_at?: Date|unknown;
}