const express = require('express');
const app = express();
const history = require('connect-history-api-fallback');

const path = require('path');

const properties = require('../config/properties.json').backend;

app.use((request, response, next) => {
    console.log(request.url);

    next();
});

const routers = [
    require('./router/apiRouter.js'),
    require('./router/tescoRouter.js'),
];

// Expose router endpoints with a starting path of '/api'
// This will allow the frontend to call our endpoints
routers.forEach(router => {
    app.use('/api', router);

    router.stack
        .filter(r => r && r.route && r.route.path)
        .map(r => r.route.path)
        .forEach(p => console.log(`Exposing: /api${p}`));
});

// Allow the use of history mode for Vuejs
// This will remove the need for '/#/' in URLs
app.use(history());

// Define the location of the static frontend files
// These will be generated in production by the backend build process
app.use(express.static(path.join(__dirname, 'public')));

app.listen(properties.port, () => {
    console.log(`Started application on port ${properties.port}`);
});