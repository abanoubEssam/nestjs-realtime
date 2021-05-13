import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL_NAME } from 'src/shared/constants';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(USER_MODEL_NAME) private userModel: Model<User>) {}

    async createUser(body):Promise<User>{
        return await this.userModel.create(body)
    }


    async findOne(query: any):Promise<User>{
        return await this.userModel.findOne(query)
    }
}
