export interface User {
    id?: number|0;
    data?: any[],
    username?: string;
    password?: string;
    password_confirmation?: string;
    lname?: string;
    fname?: string;
    mname?: string;
    suffix?: string;
    contact_no?: string;
    email?: string;
    education_level?: string;
    birthdate?: Date | null | Dayjs;
    birthplace?: string;
    sex?: string;
    civil_status?: string;
    religion?: string;
    ethnic_group?: string;
    nationality?: string;
    height?: number;
    weight?: number;
    blood_type?: string;
    sss?: string;
    tin?: string;
    gsis?:string;
    id_type?: string;
    id_no?: string;
    philhealth?: string;
    umid?: string;
    household_size?: number;
    occupation?: string;
    industry_code?: string;
    occupational_code?: string;
    monthly_income?: string|number;
    business_name?:string;
    business_address?: string;
    contact_person?: string;
    contact_person_no?: string;
    sector_presented?: string;
    organization_affiliated?: string;
    org_aff_address?: string;
    
    name?: string;
    
    province?: string|number|null;
    city?: string|number|null;
    barangay?: string|number|null;
    street?: string|number|null;
    zip_code?: string|number|null;
    image?: string;
    email_verified_at?: string;
    role?: string|null;
    id_image?: string|null;
    membership_date?: Date|null;
    active?: number;
    is_loan_allowed?: number;
    created_at?: Date|null;
    updated_at?: Date|null;
    last_login?: Date|null;
    is_2fa?:boolean;
    code_2fa?:string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
       
    };
    csrf_token: string;
};
