import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FILENAMEApi = createApi({
	reducerPath: 'FILENAME',
	tagTypes: ['$$FILENAME'],
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3300/' }),
	endpoints: (build) => ({
		get$FILENAME: build.query<any, void>({
			query: () => '__FILENAME',
			providesTags: (result) => ['$$FILENAME'],
		}),
		get$FILENAMEById: build.query<any, string>({
			query: (id: string) => `__FILENAME/${id}`,
			providesTags: (result) => ['$$FILENAME'],
		}),
		add$FILENAME: build.mutation<any, any>({
			query(body) {
				return {
					url: `__FILENAME`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['$$FILENAME'],
		}),
		update$FILENAME: build.mutation<any, any>({
			query(body) {
				return {
					url: `__FILENAME`,
					method: 'PATCH',
					body,
				};
			},
		}),
		delete$FILENAME: build.mutation<any, string>({
			query(id) {
				return {
					url: `__FILENAME/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: ['$$FILENAME'],
		}),
	}),
});
