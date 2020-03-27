import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

import { freshchatModule } from './store'
import { afterRegistration, isEnabled } from './hooks/afterRegistration'

export const KEY = 'freshchat'

const freshchatSnippet = (fcConfig) => (function (w, d, u, h, a) {
  h = d.getElementsByTagName('head')[0];
  a = d.createElement('script');
  a.async = 1;
  a.src = u
  a.onload = function () {
    w.fcWidget.init({
      token: fcConfig.token,
      host: fcConfig.host
    });
  }
  h.appendChild(a);
})(window as any, document, '//wchat.freshchat.com/js/widget.js');

export const FreshchatModule: StorefrontModule = function ({store, router, appConfig}) {
  if (isEnabled(appConfig.freshchat.token)) {
    if (!isServer && appConfig.freshchat && appConfig.freshchat.token) {
      freshchatSnippet(appConfig.freshchat);
    }
  } else {
    Logger.warn('Freshchat extensions is not working. Ensure Freshchat ID is defined in config', 'FC')()
  }

  store.registerModule(KEY, freshchatModule)

  afterRegistration(appConfig, store)
}
