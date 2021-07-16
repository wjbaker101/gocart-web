import { TescoApi } from '@/api/tesco/Tesco.api';
import { AuthApi } from '@/api/auth/Auth.api';

export const API = {

    ...TescoApi,
    ...AuthApi,
}