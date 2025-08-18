import type { FieldErrors, SubmitHandler } from "react-hook-form";
import type { ICreateCategoryForm } from "../model";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
	Textarea,
} from "@/shared/ui";

import { useCreateMileageCategory } from "../api";
import { createCategorySchema } from "../model";

function CreateCategoryDialog() {
	const [open, setOpen] = useState(false);

	const { mutateAsync } = useCreateMileageCategory();

	const { register, handleSubmit, reset } = useForm<ICreateCategoryForm>({
		resolver: zodResolver(createCategorySchema),
		values: {
			name: "",
			description: "",
		},
	});

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (!isOpen) {
			reset();
		}
	};

	const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setOpen(true);
	};

	const onError = (error: FieldErrors<ICreateCategoryForm>) => {
		toast.error(error.name?.message || error.description?.message);
	};

	const onSubmit: SubmitHandler<ICreateCategoryForm> = async (data) => {
		toast.promise(
			mutateAsync({
				name: data.name,
				description: data.description,
			}),
			{
				loading: "활동 분야 생성 중...",
				success: (_) => {
					setOpen(false);
					reset({
						name: "",
						description: "",
					});
					return `활동 분야가 생성되었습니다.`;
				},
				error: "활동 분야 생성에 실패했습니다.",
			},
		);
	};
	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
				<Button variant="default" className="w-fit">
					<PlusIcon />
					활동 분야 추가
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<form
					onSubmit={handleSubmit(onSubmit, onError)}
					className="flex flex-col gap-4"
				>
					<AlertDialogHeader>
						<AlertDialogTitle>새 활동 분야 생성</AlertDialogTitle>
						<AlertDialogDescription className="break-keep">
							새로운 마일리지 활동 분야를 생성합니다.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-1">
							<Label htmlFor="category-name">활동 분야 명</Label>
							<span className="text-red-500">*</span>
						</div>
						<Input
							id="category-name"
							maxLength={50}
							placeholder="예) 창업 분야"
							{...register("name")}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-1">
							<Label htmlFor="category-description">설명</Label>
							<span className="text-red-500">*</span>
						</div>
						<Textarea
							id="category-description"
							placeholder="예) 창업 분야는 창업 활동을 통해 얻을 수 있는 마일리지 점수를 의미합니다."
							{...register("description")}
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

export default CreateCategoryDialog;
