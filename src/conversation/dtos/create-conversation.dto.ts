import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsDefined()
  otherUserId: string;

}
