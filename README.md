# GoCart

GoCart is a webapp which allows you to create a shopping list with products found at Tesco.

It utilises [Tesco's offical developers API](https://devportal.tescolabs.com)* to retrieve up-to-date data on products, grocery searching and nearby shop searching.

_* (Tesco are not accepting new developer accounts and has announced that the API has been shut down. It is currently still working, but can go down permanently at any time.)_

Tesco only provides additional data, such as ingredients and nutritional values, for Tesco branded products. Therefore, the [Open Food Facts API](https://world.openfoodfacts.org) is used alongside, to provide more complete data.

[Mapbox](https://www.mapbox.com) is also used for their static map image generation.

## Frontend

Written in Vue.js, can be found in the `/src/frontend` directory (but also in the root directory).

### Dev & Build

1. In the root folder: `npm install`.
2. To dev: `npm run serve`.
3. To production build: `npm run build`. This will place files in the `/backend/src/main/resources/public` directory.

## Backend

The backend takes care of communication with the various APIs that are used to make GoCart work.

Written in Java using the Spring Boot framework, can be found in the `/src/backend` directory.
