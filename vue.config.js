const config = require('./src/frontend/config/properties.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    outputDir: './backend/src/main/resources/public',

    chainWebpack(config) {
        config.module.rules.delete('svg');

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
                '@': __dirname + '/src/frontend',
            },
        },
        entry: {
            app: './src/frontend/main.ts',
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [{
                    from: 'src/frontend/public/',
                    to: '',
                }],
            }),
        ],
    },

    devServer: {
        port: config.frontend.port,
        proxy: {
            '/api': {
                target: `http://localhost:${config.backend.port}`,
                ws: true,
                changeOrigin: true,
            }
        },
        disableHostCheck: true,
    },

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import 'src/frontend/style/global-inject.scss';`,
            },
        },
    },

    pwa: {
        name: 'GoCart',
        themeColor: '#176bc0',
        msTileColor: '#176bc0',
        appleMobileWebAppCapable: 'yes',
        manifestOptions: {
            background_color: '#fafafa',
        },
    },
}
