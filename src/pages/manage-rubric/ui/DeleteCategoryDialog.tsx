import type { MileageCategory } from "@entities/mileage-rubric";

import { useState } from "react";

import { toast } from "sonner";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
} from "@/shared/ui";

import { useDeleteMileageCategory } from "../api";

interface DeleteCategoryDialogProps {
	category: MileageCategory;
}

function DeleteCategoryDialog({ category }: DeleteCategoryDialogProps) {
	const [open, setOpen] = useState(false);

	const { mutateAsync } = useDeleteMileageCategory();

	const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setOpen(true);
	};

	const onSubmit = async () => {
		toast.promise(
			mutateAsync({
				categoryId: category.id,
			}),
			{
				loading: "활동 분야 삭제 중...",
				success: (_) => {
					setOpen(false);
					return `활동 분야가 삭제되었습니다.`;
				},
				error: "활동 분야 삭제에 실패했습니다.",
			},
		);
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
				<Button variant="destructiveOutline" className="text-xs p-2 h-6">
					삭제
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>활동 분야 삭제</AlertDialogTitle>
				</AlertDialogHeader>
				<div className="flex flex-col gap-2 text-muted-foreground">
					<p>{category.name}를 삭제하시겠습니까?</p>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel>취소</AlertDialogCancel>
					<Button onClick={onSubmit}>삭제</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteCategoryDialog;
