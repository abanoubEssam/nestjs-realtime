import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL_NAME } from 'src/shared/constants';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: USER_MODEL_NAME, schema: UserSchema }])],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    UserService
  ]
})
export class UserModule { }
