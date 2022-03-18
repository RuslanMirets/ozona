import { IsNotEmpty } from 'class-validator';

export class UpdateInfoDto {
  @IsNotEmpty({ message: 'Введите имя' })
  name: string;

  filename: string;
}
