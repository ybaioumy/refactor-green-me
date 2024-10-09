import { useMemo } from 'react';

const useGetItemIdByName = (data, name) => {
    // Check if data is still loading or not available

    // Use useMemo to only build the map when data changes
    const map = useMemo(() => {
        const map = new Map();
        data?.forEach(item => {
            map.set(item.name.toLowerCase(), item.id);
        });
        return map;
    }, [data]);

    // Return the item ID or null if not found
    return map.get(name.toLowerCase()) || null;
};

export default useGetItemIdByName;
