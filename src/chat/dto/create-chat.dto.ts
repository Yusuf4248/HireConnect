import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ description: 'Application ID', type: Number })
  application_id: number;

  @ApiProperty({ description: 'HR ID', type: Number })
  hr_id: number;

  @ApiProperty({ description: 'Job Seeker ID', type: Number })
  job_seeker_id: number;

  @ApiProperty({ description: 'Chat status', type: String, nullable: true })
  status?: string;
}
