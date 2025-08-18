import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { HrSpecialist } from '../../hr_specialists/entities/hr_specialist.entity';

@Entity('company-hr-specialists')
export class CompanyHrSpecialist {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier for the HR specialist',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'Company ID', type: () => Company })
  @ManyToOne(() => Company, (company) => company.companyHrSpecialist, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @ApiProperty({
    example: 1,
    description: 'HrSpecialist ID',
    type: () => HrSpecialist,
  })
  @ManyToOne(
    () => HrSpecialist,
    (hrSpecialist) => hrSpecialist.companyHrSpecialist,
    {
      onDelete: 'CASCADE',
    },
  )
  hrSpecialist: HrSpecialist;

  @ApiProperty({
    example: false,
    description: 'Is this hr specialist admin or not',
  })
  @Column({ type: 'boolean', default: false })
  is_company_admin: boolean;

  @ApiProperty({
    example: false,
    description: 'Is this hr specialist active or not',
  })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
