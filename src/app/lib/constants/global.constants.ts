export const constants = {
  USER: 'user',
  TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  EXPIRES_AT: 'expiresAt',
  publicUrls: {
    ACCOUNT_API: '/account/',
  },
};

export enum challengeType {
  INDIVIDUALS = 'Individuals',
  TEAMS = 'Teams',
  CURATOR = 'curator',
  NONE = 'none',
}
export const PHONE_REGX_NUMBER_CHECK = /^[0-9]+$/;

export const PHONE_REGX_CHECK = '^\\+[1-9]\\d{8,14}$';
