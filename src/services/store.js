import Vue from 'vue';
import Vuex from 'vuex';
import {deepClone} from '../utils.js';

Vue.use(Vuex);

export const MUTATION_NAMES = {
    SET_ITEMS: 'setItems',
    SELECT_ITEM: 'selectItem'
};

const defaultState = {
    entities: {
        items: {}
    },
    items: {
        selectedItemId: null
    }
};

const mutations = {
    [MUTATION_NAMES.SET_ITEMS](state, items) {
        state.entities.items = items;
    },
    [MUTATION_NAMES.SELECT_ITEM](state, itemId) {
        state.items.selectedItemId = itemId;
    }
};

const getters = {
    items(state) {
        return Object.values(deepClone(state.entities.items));
    },
    selectedItem(state) {
        const id = state.items.selectedItemId || -1;
        return state.entities.items[id];
    }
};

export default new Vuex.Store({
    state: defaultState,
    mutations,
    getters
});
