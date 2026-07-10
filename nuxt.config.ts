import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    compatibilityDate: '2026-07-01',

    devtools: {
        enabled: false,
    },

    modules: [
        '@vite-pwa/nuxt',
        '@nuxt/fonts',
    ],

    css: ['@/styling/main.css'],

    pages: {
        pattern: [
            '**/*.vue',
            '!**/_components/**',
            '!**/_logic/**',
        ],
    },

    vite: {
        plugins: [
            tailwindcss(),
        ],
        optimizeDeps: {
            include: [
                '@lucide/vue',
                '@vueuse/core',
                'better-auth/vue',
                'zod',
            ],
        },
    },

    nitro: {
        preset: 'bun',
    },

    app: {
        head: {
            link: [
                { rel: 'apple-touch-icon', href: '/static/apple-touch-icon.png' },
                { rel: 'icon', href: '/static/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
                { rel: 'icon', href: '/static/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
            ],
        },
    },

    pwa: {
        manifest: {
            name: 'GoCart',
            short_name: 'GoCart',
            description: 'A Tesco shopping list app.',
            theme_color: '#176bc0',
            display: 'standalone',
            icons: [
                {
                    'src': '/static/pwa-192x192.png',
                    'sizes': '192x192',
                    'type': 'image/png',
                    'purpose': 'any',
                },
                {
                    'src': '/static/pwa-512x512.png',
                    'sizes': '512x512',
                    'type': 'image/png',
                    'purpose': 'any',
                },
                {
                    'src': '/static/pwa-maskable-192x192.png',
                    'sizes': '192x192',
                    'type': 'image/png',
                    'purpose': 'maskable',
                },
                {
                    'src': '/static/pwa-maskable-512x512.png',
                    'sizes': '512x512',
                    'type': 'image/png',
                    'purpose': 'maskable',
                },
            ],
        },
    },

});