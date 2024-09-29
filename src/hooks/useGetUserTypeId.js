import { useState, useEffect } from 'react';
import { useGetRolesQuery } from '../redux/features/auth';

const useFetchUserTypeMap = (id) => {
    const [userTypeMap, setUserTypeMap] = useState({});
    const { data, isLoading, isError } = useGetRolesQuery()

    // Map the user types by ID
    const map = data.reduce((acc, { id, name }) => {
        acc[id] = name.toLowerCase(); 
        return acc;
    }, {});

    setUserTypeMap(map);

    const getUserType = (typeId) => userTypeMap[Number(typeId)] || 'unknown';
    const userId = getUserType(id)
    return { userTypeMap, getUserType, userId };
};

export default useFetchUserTypeMap;