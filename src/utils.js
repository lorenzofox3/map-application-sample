export const normalize = (geoJSON = {}) => {
    const {features = []} = geoJSON;
    
    return Object.fromEntries(features.map((f) => {
        const {properties: {id, ...props}, geometry} = f;
        return [id, {
            id,
            geometry,
            ...props
        }];
    }));
};

export const deepClone = (object) => JSON.parse(JSON.stringify(object));
