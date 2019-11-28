import express, { Router } from 'express';
import bodyParser from 'body-parser';

import LoggingUtils from '@backend/util/LoggingUtils';
import config from '@common/config/config.json';
import BackendAuth from '@backend/auth/BackendAuth';

import TescoRouter from '@backend/router/TescoRouter';
import LogRouter from '@backend/router/LogRouter';

const app = express();

app.use(LogRouter);

app.use(BackendAuth.authenticate);
app.use(bodyParser.json());

const routers: Router[] = [
    TescoRouter,
];

routers.forEach(router => {
    app.use(config.backend.prefix, TescoRouter);

    router.stack
            .filter(r => r && r.route && r.route.path)
            .map(r => r.route.path)
            .forEach(p => LoggingUtils.log(`Exposing endpoint: ${config.backend.prefix}${p}`));
});

export default app;
