import { useState, useEffect } from 'react';
import { useGetRolesQuery } from '../redux/features/auth';

const useFetchUserTypeMap = (id) => {
    const [userTypeMap, setUserTypeMap] = useState({});

    const { data, isLoading, isError } = useGetRolesQuery()
    // Function to fetch user types from an API

    // Map the user types by ID
    const map = data.reduce((acc, { id, name }) => {
        acc[id] = name.toLowerCase(); // Assuming 'name' contains the type name
        return acc;
    }, {});

    setUserTypeMap(map);

    const getUserType = (typeId) => userTypeMap[Number(typeId)] || 'unknown';
    const userId = getUserType(id)
    return { userTypeMap, getUserType, userId };
};

export default useFetchUserTypeMap;