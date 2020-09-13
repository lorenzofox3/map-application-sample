export const mapIsSelected = (id) => (item) => {
    const isSelected = Boolean(id && (item.id === id || item.parent_id === id));
    return {
        ...item,
        isSelected
    };
};

export const formatMapBoxStyleAttribute = (def) => JSON.stringify(def).replace(/"/g, '\'');

export const selectedItemId = (selectedItem) => selectedItem?.id ?? -1;

export const centerString = (coords) => coords.join(',');
