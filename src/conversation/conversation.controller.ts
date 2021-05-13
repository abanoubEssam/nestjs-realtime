import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user';
import { User } from 'src/user/interfaces/user.interface';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';


@ApiBearerAuth()
@ApiTags("Conversation")
@Controller('conversation')
export class ConversationController {

    constructor(private readonly _conversationService: ConversationService) { }

    @Post('/')
    async createConversation(
        @CurrentUser() user: User,
        @Body() createConversationDto: CreateConversationDto
    ) {
        return this._conversationService.create(user, createConversationDto.otherUserId)
    }

    @Get('/')
    async findConversations(
        @CurrentUser() user: User,
    ) {
        return this._conversationService.find(user)
    }
}
