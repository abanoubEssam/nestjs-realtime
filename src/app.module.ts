import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: async () => ({
      uri: 'mongodb://localhost/realtime-socket',
    })
  }), AuthModule, UserModule, ConversationModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SocketGateway
  ],
})
export class AppModule { }
