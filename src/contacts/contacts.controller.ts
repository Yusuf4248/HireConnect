import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";

@ApiTags("Contacts")
@Controller("contacts")
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new contact" })
  @ApiResponse({ status: 201, description: "Contact successfully created" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  @ApiBody({ type: CreateContactDto })
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all contacts" })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: "List of contacts returned" })
  findAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.contactsService.findAll(+page, +limit);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get contact by ID" })
  @ApiParam({ name: "id", type: Number, description: "ID of the contact" })
  @ApiResponse({ status: 200, description: "Contact found" })
  @ApiResponse({ status: 404, description: "Contact not found" })
  findOne(@Param("id") id: string) {
    return this.contactsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update contact by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the contact to update",
  })
  @ApiResponse({ status: 200, description: "Contact updated successfully" })
  @ApiResponse({ status: 404, description: "Contact not found" })
  @ApiResponse({ status: 400, description: "Validation failed" })
  @ApiBody({ type: UpdateContactDto })
  update(@Param("id") id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete contact by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "ID of the contact to delete",
  })
  @ApiResponse({ status: 200, description: "Contact deleted successfully" })
  @ApiResponse({ status: 404, description: "Contact not found" })
  remove(@Param("id") id: string) {
    return this.contactsService.remove(+id);
  }
}
