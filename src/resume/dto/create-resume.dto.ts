export class CreateResumeDto {
  job_seeker_id: number;
  file_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  is_primary?: boolean;
}
