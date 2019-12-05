import config from '../../common/config/config.json';
import dateformat from 'dateformat';

const DATE_FORMAT = 'ddd dS mmm yyyy, HH:MM:ss:l';

class LoggingUtils {

    log(message: string) {
        if (config.backend.isLoggingEnabled) {
            const date = dateformat(new Date(), DATE_FORMAT);

            console.log(`[${date}] - ${message}`);
        }
    }
}

export default new LoggingUtils();
