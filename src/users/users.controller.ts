import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

@ApiTags("Users") // Groups all user-related endpoints together in Swagger UI
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiCreatedResponse({
    description: "The user has been successfully created.",
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiOkResponse({
    description: "List of all users",
    type: [CreateUserDto], // Assuming CreateUserDto represents user structure
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiOkResponse({
    description: "The user with the requested ID",
    type: CreateUserDto,
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "ID of the user to retrieve",
  })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user" })
  @ApiOkResponse({
    description: "The user has been successfully updated",
    type: UpdateUserDto,
  })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "ID of the user to update",
  })
  @ApiBody({ type: UpdateUserDto })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user" })
  @ApiOkResponse({ description: "The user has been successfully deleted" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "ID of the user to delete",
  })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
