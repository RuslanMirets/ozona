import { UpdateInfoDto } from './dto/update-info.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserService } from 'src/modules/user/user.service';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { User } from 'src/core/decorators/user.decorator';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

export const storage = {
  storage: diskStorage({
    destination: './uploads/avatar',
    filename: (req, file, callback) => {
      const filename = uuidv4();
      const extension = file.originalname.split('.').pop();
      callback(null, `${filename}.${extension}`);
    },
  }),
};

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOneById(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reset-password')
  resetPassword(@User() userId: string, @Body() dto: ResetPasswordDto) {
    return this.userService.resetPassword(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-name')
  updateName(@User() userId: string, @Body() dto: UpdateInfoDto) {
    return this.userService.updateName(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', storage))
  @Patch('update-avatar')
  updateAvatar(@User() userId: string, @UploadedFile() dto: UpdateInfoDto) {
    return this.userService.updateAvatar(userId, dto);
  }
}
