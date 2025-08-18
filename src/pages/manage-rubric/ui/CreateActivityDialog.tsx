import type { FieldErrors, SubmitHandler } from "react-hook-form";
import type { ICreateActivityForm } from "../model";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
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

import { useCreateMileageActivity } from "../api";
import { createActivitySchema } from "../model";

function CreateActivityDialog() {
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

	const { mutateAsync } = useCreateMileageActivity();

	const { register, handleSubmit, reset, control, watch } =
		useForm<ICreateActivityForm>({
			resolver: zodResolver(createActivitySchema),
			defaultValues: {
				name: "",
				pointDescription: "",
				mileageCategoryId: "",
				pointType: POINT_TYPE.FIXED,
				fixedPoint: "",
			},
		});

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) {
			reset(
				{
					name: "",
					pointDescription: "",
					mileageCategoryId: "",
					pointType: POINT_TYPE.FIXED,
					fixedPoint: "",
				},
				{ keepDefaultValues: false },
			);
		}
	};

	const handleOpen = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await queryClient.prefetchQuery(mileageRubricQueries.getRubric());
		setOpen(true);
	};

	const onError = (error: FieldErrors<ICreateActivityForm>) => {
		console.log(error);
		toast.error(error.name?.message || error.pointDescription?.message);
	};

	const onSubmit: SubmitHandler<ICreateActivityForm> = async (data) => {
		toast.promise(
			mutateAsync({
				name: data.name,
				pointDescription: data.pointDescription,
				mileageCategoryId: Number(data.mileageCategoryId),
				pointType: data.pointType,
				...(data.fixedPoint && { fixedPoint: Number(data.fixedPoint) }),
			}),
			{
				loading: "비교과 활동 생성 중...",
				success: (_) => {
					setOpen(false);
					reset();
					return `비교과 활동이 추가되었습니다.`;
				},
				error: "오류가 발생했습니다.",
			},
		);
	};
	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
				<Button variant="default" className="w-fit">
					<PlusIcon />
					비교과 활동 추가
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[800px]">
				<form
					onSubmit={handleSubmit(onSubmit, onError)}
					className="flex flex-col gap-4"
				>
					<AlertDialogHeader>
						<AlertDialogTitle>새 비교과 활동 생성</AlertDialogTitle>
						<AlertDialogDescription className="break-keep">
							새로운 비교과 활동을 생성합니다.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex flex-col gap-2">
						<Label className="text-sm font-medium text-body">활동 분야</Label>
						<Controller
							name="mileageCategoryId"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="활동 분야를 선택해주세요." />
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
						<Label htmlFor="category-name">활동명</Label>
						<Input
							id="category-name"
							maxLength={200}
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
							<Label htmlFor="category-description">배점</Label>
							<Input
								id="category-description"
								placeholder="예) 20"
								{...register("fixedPoint")}
							/>
						</div>
					)}
					<div className="flex flex-col gap-2">
						<Label htmlFor="category-description">설명</Label>
						<Textarea
							id="category-description"
							placeholder="예) 클릭당 1건 (최대 200 / 팀원수로 동일 분배)"
							{...register("pointDescription")}
						/>
					</div>

					<AlertDialogFooter>
						<AlertDialogCancel>취소</AlertDialogCancel>
						<Button type="submit">생성</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default CreateActivityDialog;
