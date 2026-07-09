import dayjs from 'dayjs';
import z from 'zod';

export interface ITescoSearchShopsResponse {
    readonly results: Array<ITescoSearchShopResult>;
}

export interface ITescoSearchShopResult {
    readonly type: string;
    readonly branchName: string;
    readonly location: [number, number];
    readonly openingHours: Array<IOpeningHour>;
    readonly isOpenNow: boolean;
}

interface IOpeningHour {
    readonly day: string;
    readonly intervals: Array<{
        readonly start: number;
        readonly end: number;
    }>;
    readonly isClosed: boolean;
}

const query = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
})
.readonly();

export default defineEventHandler(async (event): Promise<ITescoSearchShopsResponse> => {
    await expectSession(event);
    const { latitude, longitude } = z.parse(query, getQuery(event));

    const response = await $fetch<IResponse>('https://www.tesco.com/store-locator/searchapi', {
        query: {
            q: `${latitude},${longitude}`,
        },
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
        },
    });

    return {
        results: response.response.entities.map(result => ({
            type: result.profile.name,
            branchName: result.profile.c_mainStorePageHeading,
            location: [result.profile.yextDisplayCoordinate.lat, result.profile.yextDisplayCoordinate.long],
            isOpenNow: mapIsOpenNow(result.profile.hours.normalHours),
            openingHours: result.profile.hours.normalHours,
        })),
    };
});

function mapIsOpenNow(openingHours: Array<IResponseOpeningHour>): boolean {
    const now = dayjs();
    const dayOfWeek = (now.day() + 6) % 7;

    const openingHour = openingHours[dayOfWeek];

    if (openingHour === undefined) {
        return false;
    }

    return !openingHour.isClosed && openingHour.intervals.some(x => now.hour() > x.start / 100 && now.hour() < (x.end === 0 ? 24 : x.end / 100));
}

interface IResponse {
    readonly response: {
        readonly entities: Array<{
            readonly profile: {
                readonly name: string;
                readonly c_mainStorePageHeading: string;
                readonly yextDisplayCoordinate: {
                    readonly lat: number;
                    readonly long: number;
                };
                readonly hours: {
                    readonly normalHours: Array<IResponseOpeningHour>;
                };
            };
        }>;
    };
}

interface IResponseOpeningHour {
    readonly day: string;
    readonly intervals: Array<{
        readonly start: number;
        readonly end: number;
    }>;
    readonly isClosed: boolean;
}