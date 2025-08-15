import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './entities/messages.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('messages')
@Controller('messages')
@UseGuards(AuthGuard, RolesGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @Roles('admin', 'hr','job_seeker')
  @ApiOperation({ summary: 'Create a new message' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: 'Message created successfully',
    type: Message,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() data: Partial<CreateCommentDto>) {
    return this.messagesService.create(data);
  }

  @Get()
  @Roles('admin', 'hr','job_seeker')
  @ApiOperation({ summary: 'Get all messages' })
  @ApiResponse({
    status: 200,
    description: 'List of all messages',
    type: [CreateCommentDto],
  })
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'hr','job_seeker')
  @ApiOperation({ summary: 'Get a message by ID' })
  @ApiParam({ name: 'id', description: 'Message ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Message found',
    type: CreateCommentDto,
  })
  @ApiResponse({ status: 404, description: 'Message not found' })
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a message by ID' })
  @ApiParam({ name: 'id', description: 'Message ID', type: String })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({
    status: 200,
    description: 'Message updated successfully',
    type: Message,
  })
  @ApiResponse({ status: 404, description: 'Message not found' })
  update(@Param('id') id: string, @Body() data: Partial<UpdateCommentDto>) {
    return this.messagesService.update(Number(id), data);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a message by ID' })
  @ApiParam({ name: 'id', description: 'Message ID', type: String })
  @ApiResponse({ status: 200, description: 'Message deleted successfully' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}