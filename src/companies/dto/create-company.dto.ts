export class CreateCompanyDto {
  name: string;
  description?: string;
  website?: string;
  logo_url?: string;
  industry: string;
  company_size: 'SMALL' | 'MEDIUM' | 'LARGE';
  location: string;
  phone: string;
  email: string;
  founded_year: number;
  is_verified?: boolean;
}  