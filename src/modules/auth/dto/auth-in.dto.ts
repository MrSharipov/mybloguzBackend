import { IsNotEmpty } from 'class-validator';

export class AuthInDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
