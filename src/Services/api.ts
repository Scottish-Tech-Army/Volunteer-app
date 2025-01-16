/**
 * @file defines API endpoints, and how to fetch and transform data using RTK Query's createApi.
 */
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '' })
export type ApiBaseQueryFunctionType = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>

const baseQueryWithInterceptor: ApiBaseQueryFunctionType = async (
  args,
  api,
  extraOptions,
) => {
  let result
  try {
    result = await baseQuery(args, api, extraOptions)
  } catch (err: any) {
    console.log('Error in baseQueryWithInterceptor:')
    console.log(err)
    console.log(err?.message)
    console.log(JSON.stringify(err))
  }

  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})
