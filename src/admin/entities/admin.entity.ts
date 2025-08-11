import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
@PrimaryGeneratedColumn({type:"bigint"})
    id: number;

@Column({ type: 'bigint' })
    user_id: number;

@Column({type:"boolean"})
    isCreator:boolean
}
