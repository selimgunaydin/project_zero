/* eslint-disable @typescript-eslint/no-explicit-any */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// /api/user/profile endpoint'ine istek atacak RTK Query yapılandırması
export const user = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Next.js api rotalarımızın base URL'i
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProfileInfo: builder.query<any, void>({
      query: () => "user/profile", // => GET /api/user/profile
    }),
  }),
});

// Hook'larını export etmek
export const { useGetProfileInfoQuery } = user;
