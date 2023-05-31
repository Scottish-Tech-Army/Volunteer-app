/**
 * @file defines API endpoints, and how to fetch and transform data using RTK Query's createApi.
 */
import { Config } from '@/Config'
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
  const result = await baseQuery(args, api, extraOptions)

  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})
