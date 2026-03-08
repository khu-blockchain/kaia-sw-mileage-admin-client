import { queryOptions } from "@tanstack/react-query";

import { mileageRubricApi } from "@shared/api";

export const mileageRubricQueries = {
	all: () => ["mileage-rubric"] as const,

	getRubrics: () => [...mileageRubricQueries.all(), "rubrics"] as const,

  activity: (id: number) => [...mileageRubricQueries.all(), "activity", id] as const,

	getRubric: () =>
		queryOptions({
			queryKey: [...mileageRubricQueries.getRubrics()],
			queryFn: async () => {
				const { data } = await mileageRubricApi.getRubrics();
				return data;
			},
		}),
  
  getActivity: (id: number) =>
		queryOptions({
			queryKey: [...mileageRubricQueries.activity(id)],
			queryFn: async () => {
				const { data } = await mileageRubricApi.getMileageActivity({ id });
				return data;
			},
      staleTime: 0,
      gcTime: 0,
		}),
};
