import { MapsApi } from '@/api/maps/Maps.api';
import { TescoApi } from '@/api/tesco/Tesco.api';
import { AuthApi } from '@/api/auth/Auth.api';

export const API = {

    ...MapsApi,
    ...TescoApi,
    ...AuthApi,
}