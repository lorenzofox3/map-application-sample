import defaultStore, {MUTATION_NAMES} from './store.js';
import {normalize} from '../utils.js';

// geo Items (zones and points)
export const createService = ({store = defaultStore} = {}) => {
    return {
        async fetchItems() {
            const items = await fetch('/items')
                .then(res => res.json());
            store.commit(MUTATION_NAMES.SET_ITEMS, normalize(items));
        },
        selectItem(itemId) {
            store.commit(MUTATION_NAMES.SELECT_ITEM, itemId);
        }
    };
};

export default createService();
