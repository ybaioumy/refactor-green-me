import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authHeader } from '../../utilits/authHeader';
export const lookingForApi = createApi({
  reducerPath: 'lookingForApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE,
    prepareHeaders: (headers) => {

      headers.set('Authorization', authHeader());

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLookingFor: builder.query({
      query: () => 'LookingFor',
    }),
    getEligibilityStatus: builder.query({
      query: () => 'EligibiltyStatus',
    }),

    getAllContractingModels: builder.query({
      query: () => 'ContractingModel',
    }),
    getAllCategoriesWithCrietria: builder.query({
      query: () => 'Category/GetAllCategoriesWithCrietria',
    }),

  }),
});

export const {
  useGetLookingForQuery,
  useGetAllCategoriesWithCrietriaQuery,
  useGetAllContractingModelsQuery,
  useGetEligibilityStatusQuery,
} = lookingForApi;
