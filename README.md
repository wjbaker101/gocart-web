# GoCart

GoCart is a companion to users wanting to make their shopping experience more efficient. It integrates the Tesco API to allow for Tesco-specific products to be added to it.

## Project Setup

`$ git clone https://github.com/wjbaker101/gocart-web`

`$ cd gocart-web`

`$ npm install`

### Running in Development Mode

Run the following commands in separate command terminals:

`$ npm run start:frontend`

`$ npm run start:backend`

### Building for Production

`$ npm run build:all`

### Secret Properties Config

This file stores the keys and tokens required to use the 3rd party APIs.

Create the file `config-secret.json` in the `common/config` directory with the following content:

```
{
    "tescoAPI": {
        "apiKey": "(1)"
    },
    "locationIQAPI": {
        "accessToken": "(2)"
    },
    "backend": {
        "apiKey": "(3)"
    },
    "firebase": {
        (4)
    }
}
```

(1) Create a Tescolabs account and use your API key.

(2) Create a Location IQ account and use your access token.

(3) Generate a string of your choosing.

(4) Create a Firebase account, and use the Firebase config they give you.
