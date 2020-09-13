import {
    centerString,
    formatMapBoxStyleAttribute,
    mapIsSelected,
    selectedItemId
} from '../../src/components/MapContainer.computed.js';

export default (t) => {
    t.test(`mapIsSelected`, (t) => {
        t.test(`should set isSelected=false on all item if there is no selected item id`, (t) => {
            const map = mapIsSelected();
            t.eq(map({
                id: 1,
                foo: 'bar'
            }), {
                id: 1,
                foo: 'bar',
                isSelected: false
            });
            t.eq(map({
                id: 1,
                parent_id: 2,
                foo: 'bar'
            }), {
                id: 1,
                parent_id: 2,
                foo: 'bar',
                isSelected: false
            });
        });
        
        t.test(`should set isSelected to true if item has the same id or its parent`, () => {
            const map = mapIsSelected(4);
            t.eq(map({
                id: 4,
                foo: 'bar'
            }), {
                id: 4,
                foo: 'bar',
                isSelected: true
            });
            t.eq(map({
                id: 2,
                parent_id: 4,
                foo: 'bar'
            }), {
                id: 2,
                parent_id: 4,
                foo: 'bar',
                isSelected: true
            });
            t.eq(map({
                id: 66,
                parent_id: 12,
                foo: 'bar'
            }), {
                id: 66,
                parent_id: 12,
                foo: 'bar',
                isSelected: false
            });
        });
        
        t.test('formatMapBoxStyleAttribute', (t) => {
            t.eq(formatMapBoxStyleAttribute([
                'foo',
                4,
                ['woot', 'yeah']
            ]), `['foo',4,['woot','yeah']]`);
        });
        
        t.test(`selectedItemId`, (t) => {
            t.eq(selectedItemId({
                id: 4
            }), 4, 'should return the id of the item');
            
            t.eq(selectedItemId(), -1, 'should return -1 if there is no item');
        });
        
        t.test(`centerString`, (t) => {
            t.eq(centerString([2323, 6767]), '2323,6767', 'should return a comma joined string');
        });
    });
}
