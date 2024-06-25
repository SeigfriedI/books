import store from './index.js'

store.registerModule('shopcar', {
    namespaced: true,
    state: {
        shopnum: 0,
        shopbooks: []
    },
    mutations: {
        set_shopnum(state, payload) {
            state.shopnum = payload
        },
        set_shopbooks(state, payload) {
            state.shopbooks = payload
        }
    },
    actions: {
        revise_shopnum(store, payload) {
            store.commit('set_shopnum', payload)
        },
        revise_shopbooks(store, payload) {
            store.commit('set_shopbooks', payload)
        }
    }
})