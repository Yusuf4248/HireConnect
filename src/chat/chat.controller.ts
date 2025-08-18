import { AuthGuard } from './../common/guards/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { IsHrGuard } from '../common/guards/is.hr.guard';
import { IsJobSeekerGuard } from '../common/guards/is.job.seeker.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@ApiTags('chats')
@Controller('chats')
@UseGuards(AuthGuard, RolesGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post()
  @Roles('job_seeker', 'hr', 'admin')
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({
    status: 201,
    description: 'Chat created successfully',
    type: Chat,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() data: CreateChatDto) {
    return this.chatsService.create(data);
  }

  @Get()
  @Roles('admin', 'hr', 'job_seeker')
  @ApiOperation({ summary: 'Get all chats' })
  @ApiResponse({ status: 200, description: 'List of all chats', type: [Chat] })
  findAll() {
    return this.chatsService.findAll();
  }

  @Get('role/:role/userId/:id')
  @Roles('job_seeker', 'hr', 'admin')
  @ApiOperation({ summary: 'Get a chat by ID' })
  @ApiParam({ name: 'id', description: 'Chat ID', type: String })
  @ApiParam({ name: 'role', description: 'role', type: String })
  @ApiResponse({ status: 200, description: 'Chat found', type: Chat })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  findUserChats(@Param('role') role: string,@Param('id') id: string) {
    return this.chatsService.findUserChats(role,Number(id));
  }

  @Get(':id')
  @Roles('job_seeker', 'hr', 'admin')
  @ApiOperation({ summary: 'Get a chat by ID' })
  @ApiParam({ name: 'id', description: 'Chat ID', type: String })
  @ApiResponse({ status: 200, description: 'Chat found', type: Chat })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles('job_seeker', 'hr', 'admin')
  @ApiOperation({ summary: 'Update a chat by ID' })
  @ApiParam({ name: 'id', description: 'Chat ID', type: Number })
  @ApiBody({ type: UpdateChatDto })
  @ApiResponse({
    status: 200,
    description: 'Chat updated successfully',
    type: Chat,
  })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  update(@Param('id') id: number, @Body() data: Partial<UpdateChatDto>) {
    console.log('controller');
    return this.chatsService.update(Number(id), data);
  }

  @Delete(':id')
  @Roles('job_seeker', 'hr', 'admin')
  @ApiOperation({ summary: 'Delete a chat by ID' })
  @ApiParam({ name: 'id', description: 'Chat ID', type: String })
  @ApiResponse({ status: 200, description: 'Chat deleted successfully' })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }
}
