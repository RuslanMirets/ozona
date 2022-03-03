import { UPLOAD_REPOSITORY } from 'src/core/constants';
import { Upload } from './models/upload.model';

export const uploadProvider = [{ provide: UPLOAD_REPOSITORY, useValue: Upload }];
