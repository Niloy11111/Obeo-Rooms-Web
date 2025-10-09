/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include", // this is to get cookies from backend,
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  // this error show for expire the access token time  limit
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status == 404) {
    // toast.error(result?.error?.data?.message);
  }
  if (result.error?.status == 403) {
    // toast.error(result?.error?.data?.message);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["product"],
  endpoints: () => ({}),
});
