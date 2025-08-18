type APIResponse<T, Q = unknown> = {
	data: T;
	meta: Q;
};

export type APIPromise<T, Q = unknown> = Promise<APIResponse<T, Q>>;

export type PaginationAPIPromise<T> = APIPromise<T, PaginationMeta>;

type PaginationMeta = {
	total: number;
	lastPage?: number;
};
