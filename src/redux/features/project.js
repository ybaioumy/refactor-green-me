import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authHeader } from '../../utilits/authHeader';
import { useSelector } from 'react-redux';
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
    if (result.error && result.error.status === 204) {
        return { data: null };
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
        }),
        getProjectUsers: builder.query({
            query: (id) => `ProjectUser/${id}`
        }),
        getAllCategoriesWithCrietria: builder.query({
            query: () => 'Category/GetAllCategoriesWithCrietria',
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
            query: (id) => `FinancialProject/FinancialModel/${id}`
        })
    }),
});

export const { useGetAllProjectsQuery, useGetAllOpportunitiesQuery, useGetProjectByIdQuery, useGetProjectUsersQuery, useGetAllCategoriesWithCrietriaQuery, useGetProjectDropDownsQuery, useGetProjectsFiltersQuery, useGetProjectStatusQuery, useLazyGetProjectEligibilityQuery, useGetUsersQuery, useGetProjectEnergyAuditQuery, useGetProjectFinancialModelQuery, useGetProjectImpactViabilityQuery } = projectApi;
