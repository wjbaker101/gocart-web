import 'module-alias/register';

import LoggingUtils from '@backend/util/LoggingUtils';

import app from '@backend/app';
import config from '@common/config/config.json';

app.listen(config.backend.port, () => {
    LoggingUtils.log(`Started backend on port: ${config.backend.port}`);
});
