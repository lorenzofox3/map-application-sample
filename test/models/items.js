import {composite, item} from '../../src/models/items.js';

export default (t) => {
    t.test(`item model`, (t) => {
        const itemInput = {
            id: 7,
            name: 'some point',
            item_type: 'point',
            geometry: {
                'type': 'Point',
                'coordinates': [
                    2.911376953125,
                    48.09275716032736
                ]
            }
        };
        t.eq(item(itemInput).toGeoJSON(), {
            type: 'Feature',
            id: 7,
            properties: {
                id: 7,
                name: 'some point',
                item_type: 'point'
            },
            geometry: itemInput.geometry
        });
    });
    
    t.test('composite', (t) => {
        const itemInput = [{
            id: 7,
            name: 'some point',
            item_type: 'point',
            geometry: {
                'type': 'Point',
                'coordinates': [
                    2.911376953125,
                    48.09275716032736
                ]
            }
        }, {
            id: 6,
            parent_id: 123,
            name: 'some point',
            item_type: 'point',
            geometry: {
                'type': 'Point',
                'coordinates': [
                    2234,
                    3454
                ]
            }
        }];
        
        t.eq(composite(...itemInput).toGeoJSON(), {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                id: 7,
                properties: {
                    id: 7,
                    name: 'some point',
                    item_type: 'point'
                },
                geometry: itemInput[0].geometry
            }, {
                type: 'Feature',
                id: 6,
                properties: {
                    id: 6,
                    parent_id: 123,
                    name: 'some point',
                    item_type: 'point'
                },
                geometry: itemInput[1].geometry
            }]
        });
        
    });
};
