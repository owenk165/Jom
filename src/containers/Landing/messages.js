/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.landing';

export default defineMessages({
  header: {
    id: `${scope}.AboutPage.header`,
    defaultMessage: 'About this project',
  },
  githubInfoTitle: {
    id: `${scope}.githubInfo.title`,
    defaultMessage: 'Our github!',
  },
  githubInfoParagraph1: {
    id: `${scope}.githubInfo.paragraph1`,
    defaultMessage: 'We keep the code for the web server and prediction operation in our github!',
  },
});
