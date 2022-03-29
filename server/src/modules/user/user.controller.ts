import { UserService } from 'src/modules/user/user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from 'src/core/decorators/role-auth.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { User } from 'src/core/decorators/user.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { join } from 'path';

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

  // @Role('ADMIN')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOneById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reset-password')
  resetPassword(@User() userId: number, @Body() dto: ResetPasswordDto) {
    return this.userService.resetPassword(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-name')
  updateName(@User() userId: number, @Body() dto: UpdateInfoDto) {
    return this.userService.updateName(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', storage))
  @Patch('update-avatar')
  updateAvatar(@User() userId: number, @UploadedFile() dto: UpdateInfoDto) {
    return this.userService.updateAvatar(userId, dto);
  }

  @Get('avatar/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/avatar/' + imagename)));
  }
}
