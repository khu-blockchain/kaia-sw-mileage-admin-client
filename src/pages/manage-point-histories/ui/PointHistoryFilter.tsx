import { useState } from "react";

import { MILEAGE_POINT_HISTORY_TYPE } from "@shared/api";
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
	type: MILEAGE_POINT_HISTORY_TYPE | "";
	studentName: string;
}

interface PointHistoryFilterProps {
	onFilter: (filters: FilterValues) => void;
	onReset: () => void;
}

const PointHistoryFilter = ({ onFilter, onReset }: PointHistoryFilterProps) => {
	const [filters, setFilters] = useState<FilterValues>({
		type: "",
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
			type: "",
			studentName: "",
		};
		setFilters(resetFilters);
		onReset();
	};

	const typeOptions = [
		{
			value: MILEAGE_POINT_HISTORY_TYPE.MILEAGE_APPROVED,
			label: "마일리지 승인",
		},
		{
			value: MILEAGE_POINT_HISTORY_TYPE.MILEAGE_MINTED,
			label: "추가 지급",
		},
		{
			value: MILEAGE_POINT_HISTORY_TYPE.MILEAGE_BURNED,
			label: "회수",
		},
	];

	return (
		<div className="flex w-full items-center gap-6">
			<div className="flex gap-2">
				<Select
					value={filters.type || "all"}
					onValueChange={(value) =>
						handleFilterChange("type", value === "all" ? "" : value)
					}
				>
					<SelectTrigger className="w-40 h-9 bg-white">
						<SelectValue defaultValue={"all"} />
					</SelectTrigger>
					<SelectContent className="bg-white">
						<SelectItem className="bg-white" value="all">
							<div className="flex items-center">전체</div>
						</SelectItem>
						{typeOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								<div className="flex items-center">{option.label}</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
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

export default PointHistoryFilter;
