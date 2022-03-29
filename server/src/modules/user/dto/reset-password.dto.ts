import { MinLength } from 'class-validator';

export class ResetPasswordDto {
  @MinLength(6, { message: 'Пароль должен быть минимум 6 символов' })
  readonly password: string;
}
