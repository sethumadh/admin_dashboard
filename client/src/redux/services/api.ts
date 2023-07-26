import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL });

export const api = createApi({
  baseQuery,
  tagTypes: ['User',"Kpis", "Products", "Transactions"],
  endpoints: (builder) => ({}),
});