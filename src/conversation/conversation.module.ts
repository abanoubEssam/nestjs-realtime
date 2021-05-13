import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationSchema } from './schemas/conversation.schema';
import { CONVERSATION_MODEL_NAME } from 'src/shared/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CONVERSATION_MODEL_NAME, schema: ConversationSchema }]),
    UserModule
  ],
  providers: [ConversationService],
  controllers: [ConversationController]
})
export class ConversationModule {}
