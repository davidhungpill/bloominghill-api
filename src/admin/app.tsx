import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      'ko',
    ],
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
