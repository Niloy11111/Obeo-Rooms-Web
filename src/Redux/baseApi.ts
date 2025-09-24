import {
    BaseQueryApi,
    BaseQueryFn,
    createApi,
    DefinitionType,
    FetchArgs,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";


const baseQuery = fetchBaseQuery({
  baseUrl: "https://bike-shop-server-two.vercel.app/api/v1",
  // baseUrl: "http://localhost:5000/api/v1",
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
    toast.error(result.error.data.message);
  }
  if (result.error?.status == 403) {
    toast.error(result.error.data.message);
  }

  if (result.error?.status == 401) {
    // send Refresh
    // console.log('Sending refresh token')
    // here we need to give full url because we are doing a manual fetch
    const res = await fetch(
      "https://bike-shop-server-two.vercel.app/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();

    console.log("here", data);

    // if (data?.data?.accessToken) {
    //   const user = (api.getState() as RootState).auth.user;
    //   api.dispatch(
    //     setUser({
    //       user,
    //       token: data.data.accessToken,
    //     })
    //   );
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   api.dispatch(logout());
    // }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["product"],
  endpoints: () => ({}),
});
