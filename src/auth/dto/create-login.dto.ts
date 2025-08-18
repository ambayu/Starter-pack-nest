import { IsNotEmpty, MinLength } from "class-validator";

export class CreateLoginDto {
  @IsNotEmpty({ message: 'username tidak boleh kosong' })
  username: string;

  @IsNotEmpty({ message: 'password tidak boleh kosong' })
  @MinLength(6, { message: 'password minimal 6' })
  password: string;
}
