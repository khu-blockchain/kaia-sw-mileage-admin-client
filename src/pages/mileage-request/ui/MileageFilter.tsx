import { useState } from "react";

import { MILEAGE_STATUS } from "@shared/api";
import {
	Button,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shared/ui";

interface FilterValues {
	status: MILEAGE_STATUS | "";
	studentId: string;
}

interface MileageFilterProps {
	onFilter: (filters: FilterValues) => void;
	onReset: () => void;
}

const MileageFilter = ({ onFilter, onReset }: MileageFilterProps) => {
	const [filters, setFilters] = useState<FilterValues>({
		status: "",
		studentId: "",
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
			status: "",
			studentId: "",
		};
		setFilters(resetFilters);
		onReset();
	};

	const statusOptions = [
		{
			value: MILEAGE_STATUS.REVIEWING,
			label: "심사 대기",
		},
		{
			value: MILEAGE_STATUS.APPROVED,
			label: "승인",
		},
		{
			value: MILEAGE_STATUS.REJECTED,
			label: "반려",
		},
	];

	return (
		<div className="flex w-full items-center gap-6">
			<div className="flex gap-2">
				<Select
					value={filters.status || "all"}
					onValueChange={(value) =>
						handleFilterChange("status", value === "all" ? "" : value)
					}
				>
					<SelectTrigger className="w-40 h-9 bg-white">
						<SelectValue defaultValue={"all"} />
					</SelectTrigger>
					<SelectContent className="bg-white">
						<SelectItem className="bg-white" value="all">
							<div className="flex items-center">전체</div>
						</SelectItem>
						{statusOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								<div className="flex items-center">{option.label}</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Input
					id="studentId"
					placeholder="학번을 입력하세요"
					value={filters.studentId}
					onChange={(e) => handleFilterChange("studentId", e.target.value)}
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

export default MileageFilter;
