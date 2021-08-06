/* 
    * This is the main App file
    * Use this to instantiates redux stores, storage and redux in the future 
*/

import Routing from './Routing';
import { IntlProvider } from 'react-intl';
import { UserSessionProvider } from '../../contexts/UserSession.js';

// React-intl supports the language toggle for the website
// Update the defined messages by importing JSON file
const messagesInChinese = require('../../translation/sampleChineseTranslation.json');
// To implement the message within app, uses redux/provider to change the message used appropriately
// Via switch:
// <IntlProvider messages={messagesInChinese} locale="cn" defaultLocale="en">
// <IntlProvider locale="en" defaultLocale="en">
// Other method: 
// <IntlProvider messages={languageMessageProvider} locale={languageProvider} defaultLocale="en">

export default function App() {
    return(
        <IntlProvider defaultLocale="en">
            <UserSessionProvider>
                <Routing />
            </UserSessionProvider>
        </IntlProvider>
    )
}