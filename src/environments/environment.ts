// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  version: '##buildNumber##',
  debug: false,
  production: false,
  urls: {
    app: '/app',
    api: 'http://localhost:5000/api',
  },
};
