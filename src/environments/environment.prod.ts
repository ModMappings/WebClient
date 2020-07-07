import {Environment} from './environment-interface';

export const environment: Environment = {
  production: true,
  publicUrl: 'https://web.modmappings.org',
  openIdServer: 'https://auth.modmappings.org/auth/realms/ModMappings',
  openIdClientId: 'web_frontend',
  apiBaseUrl: 'https://api.modmappings.org'
};
