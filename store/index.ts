import { Module } from 'vuex'
import FreshchatState from '../types/FreshchatState'

export const freshchatModule: Module<FreshchatState, any> = {
  namespaced: true,
  state: {
    key: null
  }
}
