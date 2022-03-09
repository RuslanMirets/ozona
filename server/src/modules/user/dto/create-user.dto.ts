import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Введите имя' })
  readonly name: string;

  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail(undefined, { message: 'Некорректная почта' })
  readonly email: string;

  @MinLength(6, { message: 'Пароль должен быть минимум 6 символов' })
  readonly password: string;
}
