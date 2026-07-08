import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '~~/.prisma/client';

const prismaClientSingleton = () => {
    const adapter = new PrismaPg({ connectionString: process.env.PG_CONNECTION_STRING! });

    const client = new PrismaClient({
        adapter,
        log: [
            {
                emit: 'event',
                level: 'query',
            },
        ],
    });

    client.$on('query', (e) => {
        // console.log('Query: ' + e.query);
        // console.log('Params: ' + e.params);
    });

    return client;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}