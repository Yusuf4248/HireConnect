import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateAdminDto {
    @IsNumber()
    user_id:number

    @IsBoolean()
    isCreator:boolean 
}
