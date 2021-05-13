import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONVERSATION_MODEL_NAME } from 'src/shared/constants';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { Conversation } from './interfaces/conversation.interface';

@Injectable()
export class ConversationService {
    constructor(
        @InjectModel(CONVERSATION_MODEL_NAME) private _conversationModel: Model<Conversation>,
        private readonly _userService: UserService
    ) { }

    async create(
        currentUser: User,
        otherUserId: string
    ): Promise<Conversation> {
        // check if there is conversation with those users
        const conversation = await this._conversationModel.findOne({
            $and: [
                { participants: { $elemMatch: { user: otherUserId } } },
                { participants: { $elemMatch: { user: currentUser.id } } }
            ]
        });
        const otherUser = await this._userService.findOne({ _id: otherUserId });
        if (!otherUser) {
            throw new NotFoundException(`User Not Found`)
        }
        if (conversation) {
            return conversation;
        }
        return await this._conversationModel.create({ participants: [{ user: currentUser.id }, { user: otherUserId }] })
    }


    async find(
        currentUser: User
    ): Promise<Conversation[]> {
        return await this._conversationModel.find({ participants: { $elemMatch: { user: currentUser.id } } });
    }
}
