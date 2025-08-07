import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./entities/contact.entity";
import { Repository } from "typeorm";

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private readonly contactRepo: Repository<Contact>
  ) {}
  async create(createContactDto: CreateContactDto) {
    const newContact = await this.contactRepo.save(createContactDto);
    return {
      message: "New contact successfully created",
      success: true,
      data: newContact,
    };
  }

  async findAll(page: number, limit: number) {
    const [contacts, total] = await this.contactRepo.findAndCount({
      relations: [],
      skip: (page - 1) * limit,
      order: { id: "ASC" },
    });
    return {
      message: "All contacts",
      success: true,
      data: contacts,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const contact = await this.contactRepo.findOne({
      where: { id },
      relations: [],
    });
    if (!contact) {
      throw new NotFoundException(`Contact with ${id} not found`);
    }
    return {
      message: `Contact with ID-${id}`,
      success: true,
      data: contact,
    };
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    await this.findOne(id);
    await this.contactRepo.update(id, updateContactDto);
    const updatedContact = await this.findOne(id);

    return {
      message: `ID-${id} contact data updated`,
      success: true,
      data: updatedContact,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.contactRepo.delete(id);

    return {
      message: `Contact with id-${id} deleted`,
      success: true,
    };
  }
}
