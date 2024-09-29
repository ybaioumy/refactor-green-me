import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authHeader } from '../../utilits/authHeader';
import { setProject } from '../slices/project';
import _ from 'lodash';
// Custom base query to handle 204 No Content
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE,
    prepareHeaders: (headers, { getState }) => {
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', authHeader());
        return headers;
    },
});

const customBaseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    //handle empty list
    if (result.error && result.error.status === 204) {
        return { data: [] };
    }
    // Handle other errors and return a message
    if (result.error) {
        console.log(result);
        const errorMessage = result.error.data?.message || 'Something went wrong';
        return { error: { message: errorMessage, status: result.error.status } };
    }

    return { data: result.data, totalRecords: result.total };
};


export const projectApi = createApi({
    reducerPath: 'projects',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: (searchParams) => ({
                url: 'Project/filteredproject',
                method: 'POST',
                body: searchParams,
            }),
            refetchOnFocus: true,
        }),
        getAllOpportunities: builder.query({
            query: (searchParams) => ({
                url: 'Project/opportunities',
                method: 'POST',
                body: searchParams,
            }),
            refetchOnFocus: true,
        }),
        getProjectById: builder.query({
            query: (id) => `Project/${id}`,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setProject(_.cloneDeep(data)));
                } catch (error) {
                    console.error('Error fetching item by ID:', error);
                }
            },
        }),
        createProject: builder.mutation({
            query: (newProject) => ({
                url: 'Project',
                method: 'POST',
                body: newProject,
            }),
        }),
        updateProjectById: builder.mutation({
            query: ({ id, data }) => ({
                url: `Project/${id}`,
                method: 'PUT',
                body: data,
            }),

        }),
        getProjectUsers: builder.query({
            query: (id) => `ProjectUser/${id}`
        }),
        getAllCategoriesWithCrietria: builder.query({
            query: () => 'Category/GetAllCategoriesWithCrietria',
            keepUnusedDataFor: 3000,
        }),
        getProjectDropDowns: builder.query({
            query: (identifier) => `Project/GetDropDowns?identifier=${identifier}`,
            keepUnusedDataFor: 3000,

        }),
        getProjectsFilters: builder.query({
            query: () => 'Project/filters',
            keepUnusedDataFor: 3000,
        }),
        getProjectStatus: builder.query({
            query: () => 'ProjectStatus',
        }),
        getProjectEligibility: builder.query({
            query: (id) => `Project/CheckEligibilty/${id}`,
        }),
        getUsers: builder.query({
            query: () => 'Users/MyUsers',
        })
        , getProjectImpactViability: builder.query({
            query: (id) => `FinancialProject/ImpactEligibility/${id}`,
        }),
        getProjectEnergyAudit: builder.query({
            query: (id) => `FinancialProject/EnergyAudit/${id}`,
        }),
        getProjectFinancialModel: builder.query({
            query: (id) => `FinancialProject/FinancialModel/${id}`,
            refetchOnFocus: true
        })
    }),
});

export const { useGetAllProjectsQuery, useGetAllOpportunitiesQuery, useGetProjectByIdQuery, useGetProjectUsersQuery, useGetAllCategoriesWithCrietriaQuery, useGetProjectDropDownsQuery, useGetProjectsFiltersQuery, useGetProjectStatusQuery, useLazyGetProjectEligibilityQuery, useGetUsersQuery, useGetProjectEnergyAuditQuery, useGetProjectFinancialModelQuery, useGetProjectImpactViabilityQuery, useUpdateProjectByIdMutation,useCreateProjectMutation } = projectApi;
