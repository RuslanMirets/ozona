import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Введите значение' })
  readonly value: string;

  @IsNotEmpty({ message: 'Введите описание' })
  readonly description: string;
}
