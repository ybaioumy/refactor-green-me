import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authHeader } from '../../utilits/authHeader';
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', authHeader());
        return headers;
    },
});

// Custom base query to handle 204 No Content
const customBaseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    //handle empty list
    if (result.error && result.error.status === 204) {
        return { data: [] };
    }
    // Handle other errors and return a message
    if (result.error) {
        const errorMessage = result.error.data?.message || 'Something went wrong';
        return { error: { message: errorMessage, status: result.error.status } };
    }

    return { data: result.data, totalRecords: result.total };
};

export const expertApi = createApi({
    reducerPath: 'expert',
    baseQuery: customBaseQuery,
    tagTypes: ['Missions', 'Projects'],  // Define the tag types
    endpoints: (builder) => ({
        getAllExperts: builder.query({
            query: (filterBody) => ({
                url: 'Expert/expertusers',
                method: 'POST',
                body: filterBody,
            }),
        }),
        getExpertFilter: builder.query({
            query: () => 'Expert/filters',
        }),
        getMissionStatus: builder.query({
            query: () => 'MissionStatus',
        }),
        getExpertById: builder.query({}),
        getMissions: builder.query({
            query: ({ userId, projectId }) => ({
                url: `Mission`,
                method: 'GET',
                params: { userId, projectId }
            }),
            providesTags: ['Missions'],  // This query provides the 'Missions' tag
        }),
        getMissionById: builder.query({
            query: (id) => ({
                url: `Mission/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Missions', id }],  // Provide tag per mission id
        }),
        createNewMission: builder.mutation({
            query: (missionData) => ({
                url: 'Mission',
                method: 'POST',
                body: missionData,
            }),
            invalidatesTags: ['Missions'],  // This mutation invalidates the 'Missions' tag
        }),
        updateMission: builder.mutation({
            query: ({ id, data }) => ({
                url: `Mission/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Missions', id }],  // Invalidate the specific mission after update
        }),
        getExpertAssignedProjects: builder.query({
            query: (searchParams) => ({
                url: 'ProjectUser/AssignedProject',
                method: 'POST',
                body: searchParams,
            }),
            providesTags: ['Projects'],  // This query provides the 'Projects' tag
        }),
        getExpertAssignedMissions: builder.query({
            query: ({ userId }) => ({
                url: `Mission/user`,
                method: 'GET',
                params: { userId }
            }),
            providesTags: ['Missions'],  // This query provides the 'Missions' tag
        })
    })
})

export const {
    useGetAllExpertsQuery,
    useCreateNewMissionMutation,
    useGetMissionStatusQuery,
    useGetExpertFilterQuery,
    useGetMissionsQuery,
    useGetMissionByIdQuery,
    useGetExpertAssignedProjectsQuery,
    useUpdateMissionMutation,
    useGetExpertAssignedMissionsQuery
} = expertApi;