export const item = (item) => {
    const {geometry, ...rest} = item;
    return {
        toGeoJSON() {
            return {
                type: 'Feature',
                id: item.id,
                properties: {
                    ...rest
                },
                geometry
            };
        }
    };
};

export const composite = (...items) => {
    return {
        toGeoJSON() {
            return {
                type: 'FeatureCollection',
                features: items
                    .map(item)
                    .map((model) => model.toGeoJSON())
            };
        }
    };
};
