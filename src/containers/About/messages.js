/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.About';

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
  githubInfoParagraph2: {
    id: `${scope}.githubInfo.paragraph2`,
    defaultMessage: 'Find more information on how the website and prediction is written here!',
  },
  githubInfoLink: {
    id: `${scope}.githubInfo.link`,
    defaultMessage: 'https://samplegithubreposite.com/',
  },
  githubInfoLinkText: {
    id: `${scope}.githubInfo.linkText`,
    defaultMessage: 'To the repo!',
  },
});
