import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default function About() {
  return (
    <div>
      <h1> 
        <FormattedMessage {...messages.header} />
      </h1>

      {/* Github information */}
      <h2>
        <FormattedMessage {...messages.githubInfoTitle} />
      </h2>
      <h3>
        <FormattedMessage {...messages.githubInfoParagraph1} />
      </h3>
      <h3>
        <FormattedMessage {...messages.githubInfoParagraph2} />
      </h3>
      <a href="Temporary placeholder"> 
        <FormattedMessage {...messages.githubInfoLinkText} /> 
      </a>

    </div>
  );
}
