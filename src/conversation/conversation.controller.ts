import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubscribeMessage } from '@nestjs/websockets';
import { CurrentUser } from 'src/shared/decorators/current-user';
import { User } from 'src/user/interfaces/user.interface';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';


@ApiBearerAuth()
@ApiTags("Conversations")
@Controller('conversations')
export class ConversationController {

    constructor(private readonly _conversationService: ConversationService) { }

    @Post('/')
    @SubscribeMessage('conversation')
    async createConversation(
        @CurrentUser() user: User,
        @Body() createConversationDto: CreateConversationDto
    ) {
        const conversation = await this._conversationService.create(user, createConversationDto.otherUserId)
        return { event: `${createConversationDto.otherUserId}/conversation`, data: conversation }
    }

    @Get('/')
    async findConversations(
        @CurrentUser() user: User,
    ) {
        return this._conversationService.find(user)
    }
}
