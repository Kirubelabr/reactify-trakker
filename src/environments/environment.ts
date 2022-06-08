// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  version: '##buildNumber##',
  debug: false,
  production: true,
  googleClientId:
    '824608355808-d7k6m7rci3fq7u0bgoiu028v9e9vvcif.apps.googleusercontent.com',
  urls: {
    app: '/app',
    api: 'http://localhost:5000/api',
    presence: 'localhost:5500',
    challenge: 'localhost:5577',
    extension:
      'https://chrome.google.com/webstore/detail/presence/hmodnjccnnfanocghepobekicbcoaehn',
    logServer: '/logServer',
    accounts: '/accounts',
    sdk: '/sdk',
  },
};
