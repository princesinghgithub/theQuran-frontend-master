// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://s5.thequran.com/app-api/v1.0',
  apiUrl: 'https://api.thequran.com/app-api/v1.0',
  //apiUrl: 'http://localhost:3000/app-api/v1.0',
  imageUrl: 'https://api.thequran.com/public/images/',
  // imageUrl: 'https://s5.thequran.com/public/images/',
  topicImageUrl: "https://api.thequran.com/public/images/topic-uploads/",
  // topicImageUrl: 'https://s5.thequran.com/public/images/topic-uploads/',
  imageUrlXMPP: 'https://xmppmongooseim.s3.ap-south-1.amazonaws.com/',
  imageUrlS3: 'https://q-project.s3.amazonaws.com/',
  articleImageUrl: 'https://s5.thequran.com/public/images/article-uploads/',
  STRIPE_PUBIC_KEY: 'pk_test_asbXwiuauqsjMhb5xgwV8faM00RR6hEUME',
  FACEBOOK_OAUTH_CLIENT_ID: '267769915150075',
  GOOGLE_OAUTH_CLIENT_ID:
    '1009882926908-gvh1rbf0sd4u229tunbdahd16i8co77c.apps.googleusercontent.com',
  GOOGLE_RECAPTCHA_V2_SITE_KEY:
    '6LfEdCYdAAAAAOtetmor10FEsi6BTMuqZgUV_iUY' /*'6LcRbJwbAAAAAGQlTkGohl-m1-0KuzOKDelldc0n'*/,
};
//site 6LfEdCYdAAAAAOtetmor10FEsi6BTMuqZgUV_iUY
//secret 6LfEdCYdAAAAAItJKW-xQhLneOF1EqTEIWWz9uN-

// Please copy these credentials before I delete:
// email: contact@thequran.com
// Pass: HH*76TY5fr43
// smtp.ionos.com  587

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
