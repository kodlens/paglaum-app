export interface User {
    id: number|0;
    data?: any[],
    username?: string;
    password?: string;
    password_confirmation?: string;
    title?: string;
    lname?: string;
    fname?: string;
    mname?: string;
    suffix?: string;
    education_level?: string;
    birthdate?: Date | null;
    birthplace?: string;
    sex?: string;
    civil_status?: string;
    relligion?: string;
    ethnic_group?: string;
    nationality?: string;
    height?: number;
    weight?: number;
    blood_type?: string;
    sss?: string;
    tin?: string;
    drivers_license?: string;
    philhealth?: string;
    umid?: string;
    household_size?: number;
    occupation?: string;
    industry_code?: string;
    occupational_code?: string;
    monthly_income?: string;
    sector_presented?: string;
    organization_affiliated?: string;
    org_aff_address?: string;
    contact_no?: string;
    name?: string;
    email?: string;
    province?: string;
    city?: string;
    barangay?: string;
    street?: string;
    zip_code?: string;
    image?: string;
    email_verified_at?: string;
    role?: string;
    membership_date?: Date|null;
    created_at?: Date|null;
    updated_at?: Date|null;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
