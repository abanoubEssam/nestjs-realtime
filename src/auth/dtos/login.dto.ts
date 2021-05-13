import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsOptional, Matches } from 'class-validator';

export class LoginDto {
  
  @ApiProperty()
  @IsDefined()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @Matches(new RegExp('(?=.*[A-Za-z])(?=.*[0-9])[A-Za-zd$@$!%_*_#?&-_.]{8,}$'))
  password: string;


}
