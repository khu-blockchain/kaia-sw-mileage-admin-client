import { useState } from "react";

import { Button, Input } from "@shared/ui";

interface FilterValues {
	studentName: string;
}

interface StudentFilterProps {
	onFilter: (filters: FilterValues) => void;
	onReset: () => void;
}

const StudentFilter = ({ onFilter, onReset }: StudentFilterProps) => {
	const [filters, setFilters] = useState<FilterValues>({
		studentName: "",
	});

	const handleFilterChange = (key: keyof FilterValues, value: string) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSearch = () => {
		onFilter(filters);
	};

	const handleReset = () => {
		const resetFilters: FilterValues = {
			studentName: "",
		};
		setFilters(resetFilters);
		onReset();
	};

	return (
		<div className="flex w-full items-center gap-6">
			<div className="flex gap-2">
				<Input
					id="studentName"
					placeholder="학생 이름을 입력하세요"
					value={filters.studentName}
					onChange={(e) => handleFilterChange("studentName", e.target.value)}
					className="w-100 h-9 bg-white"
				/>
			</div>
			<div className="flex gap-2">
				<Button
					onClick={handleSearch}
					className="px-6 h-9 text-white font-medium"
				>
					검색
				</Button>
				<Button
					variant="outline"
					onClick={handleReset}
					className="px-6 h-9 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
				>
					초기화
				</Button>
			</div>
		</div>
	);
};

export default StudentFilter;
