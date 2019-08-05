const properties = require('./config/properties.json');

module.exports = {
    outputDir: './backend/public',
    assetsDir: 'static',

    chainWebpack: config => {
        config.module.rules.delete('svg');
    },

    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: 'vue-svg-loader',
                },
            ],
        }
    },

    devServer: {
        port: properties.frontend.port,

        proxy: {
            '/api': {
                target: `http://localhost:${properties.backend.port}`,
                ws: true,
                changeOrigin: true,
            }
        }
    },

    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import 'style/webstyle.scss';
                `,
            },
        },
    },
}