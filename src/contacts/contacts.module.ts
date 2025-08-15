import { Module } from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { ContactsController } from "./contacts.controller";
import { Contact } from "./entities/contact.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), JwtModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
