import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authHeader } from '../../utilits/authHeader';
export const proposalApi = createApi({
    reducerPath: 'proposalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE, prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Authorization', authHeader());
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProposalStatus: builder.query({
            query: () => 'ProposalStatus',
        }),
        postProposal: builder.mutation({
            query: (proposalData) => ({
                url: 'Proposal/MakeProposal',
                method: 'POST',
                body: proposalData,
            }),
        }),

        getProjectProposals: builder.query({
            query: (id) => `Proposal/project/${id}`,
        }),
        clientResponseToProposal: builder.mutation({
            query: ({ id, status, statusId }) => ({
                url: 'Proposal/SubmitProposal',
                method: 'POST',
                params: { id, status, statusId },
            }),
        }),
    })
})

export const { useGetProposalStatusQuery, usePostProposalMutation, useGetProjectProposalsQuery, useClientResponseToProposalMutation } = proposalApi;
