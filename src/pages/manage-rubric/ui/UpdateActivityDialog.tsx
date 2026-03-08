import type { MileageActivity } from "@shared/api";
import type { FieldErrors, SubmitHandler } from "react-hook-form";
import type { IUpdateActivityForm } from "../model";

import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	mileageActivityPointTypeParser,
	mileageRubricQueries,
} from "@entities/mileage-rubric";
import { POINT_TYPE } from "@shared/api";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from "@/shared/ui";

import { useUpdateMileageActivity } from "../api";
import { updateActivitySchema } from "../model";

function UpdateActivityDialog({
	activity,
	mileageCategoryId,
}: {
	activity: MileageActivity;
	mileageCategoryId: number;
}) {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const { data } = useSuspenseQuery(mileageRubricQueries.getRubric());

	const categories = useMemo(
		() =>
			data.map((rubric) => ({
				id: rubric.id,
				name: rubric.name,
			})),
		[data],
	);

	const { mutateAsync } = useUpdateMileageActivity();

	const { register, handleSubmit, reset, control, watch, setValue } =
		useForm<IUpdateActivityForm>({
			resolver: zodResolver(updateActivitySchema),
			values: {
				name: activity.name,
				pointDescription: activity.point_description,
				mileageCategoryId: mileageCategoryId.toString(),
				pointType: activity.point_type,
				fixedPoint: activity.fixed_point?.toString() ?? undefined,
				activityId: activity.id,
			},
      resetOptions: {
        keepDirtyValues: true,
      }
		});

	const handleOpen = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await queryClient.prefetchQuery(mileageRubricQueries.getRubric());
		setOpen(true);
	};

	const onError = (error: FieldErrors<IUpdateActivityForm>) => {
		console.log(error);
		toast.error(error.name?.message || error.pointDescription?.message);
	};

	const onSubmit: SubmitHandler<IUpdateActivityForm> = async (data) => {
		console.log(data);
		toast.promise(
			mutateAsync({
				name: data.name,
				pointDescription: data.pointDescription,
				mileageCategoryId: Number(data.mileageCategoryId),
				activityId: data.activityId,
				pointType: data.pointType,
				fixedPoint: data.pointType === POINT_TYPE.FIXED ? Number(data.fixedPoint) : null,
			}),
			{
				loading: "비교과 활동 수정 중...",
				success: (_) => {
					setOpen(false);
					reset();
					return `비교과 활동이 수정되었습니다.`;
				},
				error: "오류가 발생했습니다.",
			},
		);
	};

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) {
			reset();
		}
	};

	useEffect(() => {
		if (watch("pointType") === POINT_TYPE.OPTIONAL) {
			setValue("fixedPoint", undefined);
		}
	}, [watch, setValue]);

	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
				<Button variant="ghost" size="sm" className="h-3 w-3 p-0">
					<Edit className="w-2 h-2" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[800px]">
				<form
					onSubmit={handleSubmit(onSubmit, onError)}
					className="flex flex-col gap-4"
				>
					<AlertDialogHeader>
						<AlertDialogTitle>비교과 활동 수정</AlertDialogTitle>
						<AlertDialogDescription className="break-keep">
							비교과 활동을 수정합니다.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex flex-col gap-2">
						<Label className="text-sm font-medium text-body">학술 분야</Label>
						<Controller
							name="mileageCategoryId"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="학술 분야를 선택해주세요." />
									</SelectTrigger>
									<SelectContent className="w-full">
										{categories.map((category) => (
											<SelectItem
												key={category.id}
												value={category.id.toString()}
											>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="name">활동명</Label>
						<Input
							id="name"
							maxLength={50}
							placeholder="예) 창업 공모전 수상"
							{...register("name")}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label className="text-sm font-medium text-body">배점 방식</Label>
						<Controller
							name="pointType"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="배점 방식을 선택해주세요." />
									</SelectTrigger>
									<SelectContent className="w-full">
										{Object.values(POINT_TYPE).map((type) => (
											<SelectItem key={type} value={type}>
												{mileageActivityPointTypeParser(type)}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					{watch("pointType") === POINT_TYPE.FIXED && (
						<div className="flex flex-col gap-2">
							<Label htmlFor="fixed-point">배점</Label>
							<Input
								id="fixed-point"
								placeholder="예) 20"
								{...register("fixedPoint")}
							/>
						</div>
					)}
					<div className="flex flex-col gap-2">
						<Label htmlFor="category-description">설명</Label>
						<Textarea
							id="point-description"
							placeholder="예) 클릭당 1건 (최대 200 / 팀원수로 동일 분배)"
							{...register("pointDescription")}
						/>
					</div>

					<AlertDialogFooter>
						<AlertDialogCancel>취소</AlertDialogCancel>
						<Button type="submit">수정</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default UpdateActivityDialog;
