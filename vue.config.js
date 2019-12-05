const config = require('./src/common/config/config.json');

module.exports = {
    outputDir: './build/src/frontend',
    assetsDir: 'static',

    chainWebpack(config) {
        config.module.rules.delete('svg');

        config.plugin('fork-ts-checker')
            .tap(args => {
                args[0].tsconfig = './tsconfig.frontend.json';
                return args;
            });

        config.plugin('html')
            .tap(args => {
                args[0].template = './src/frontend/public/index.html';
                return args;
            });
    },

    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: 'vue-svg-loader',
                },
            ],
        },
        resolve: {
            alias: {
                '@common': __dirname + '/src/common',
                '@frontend': __dirname + '/src/frontend',
            },
        },
        entry: {
            app: './src/frontend/main.ts',
        },
    },

    devServer: {
        proxy: {
            '/api': {
                target: `http://localhost:${config.backend.port}`,
                ws: true,
                changeOrigin: true,
            }
        }
    },

    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import 'src/frontend/style/webstyle.scss';
                `,
            },
        },
    },

    pwa: {
        name: 'GoCart',
        themeColor: '#176bc0',
        msTileColor: '#176bc0',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '176bc0',
    },
}
