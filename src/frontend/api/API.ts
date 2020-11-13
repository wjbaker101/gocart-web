import { MapsApi } from '@/api/maps/Maps.api';
import { TescoApi } from '@/api/tesco/Tesco.api';

export const API = {

    ...MapsApi,
    ...TescoApi,
}