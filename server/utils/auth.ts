import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { prisma } from '~~/server/utils/db';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
        transaction: true,
    }),
    experimental: {
        joins: true,
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
    },
});