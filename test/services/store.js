import {getters} from '../../src/services/store.js';

export default (t) => {
    t.test(`getters`, (t) => {
        t.test(`items`, t => {
            const items = {
                '1': {
                    foo: 'bar'
                },
                '2': {
                    some: 'other'
                }
            };
            const itemsFromGetter = getters.items({
                entities: {
                    items
                }
            });
            t.eq(itemsFromGetter, [
                items['1'],
                items['2']
            ]);
            t.ok(items['1'] !== itemsFromGetter[0], 'should no be the same instances');
        });
        
        t.test(`selectedItem`, (t) => {
            const state1 = {
                entities: {
                    items: {
                        '1': {
                            some: 'item'
                        }
                    }
                },
                items: {
                    selectedItemId: 1
                }
            };
            t.eq(getters.selectedItem(state1), {
                some: 'item'
            });
            
            const state2 = {
                entities: {
                    items: {
                        '1': {
                            some: 'item'
                        }
                    }
                },
                items: {
                    selectedItemId: undefined
                }
            };
            
            t.eq(getters.selectedItem(state2), undefined);
            
        });
    });
    
}
