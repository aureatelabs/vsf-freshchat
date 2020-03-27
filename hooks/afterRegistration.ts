import { Store } from 'vuex'
import { isServer } from '@vue-storefront/core/helpers'

export const isEnabled = (fcToken: string | null) => {
  return typeof fcToken === 'string' && fcToken.length > 0 && !isServer
}

export function afterRegistration (config, store: Store<any>) { }
