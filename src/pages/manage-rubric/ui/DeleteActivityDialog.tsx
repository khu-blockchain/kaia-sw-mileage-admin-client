
import { useState } from "react";

import { Trash2 } from "lucide-react";
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

import { useDeleteMileageActivity } from "../api";
import type { MileageActivity } from "@shared/api";

interface DeleteActivityDialogProps {
	activity: MileageActivity;
}

function DeleteActivityDialog({ activity }: DeleteActivityDialogProps) {
	const [open, setOpen] = useState(false);

	const { mutateAsync } = useDeleteMileageActivity();

	const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setOpen(true);
	};

	const onSubmit = async () => {
		toast.promise(
			mutateAsync({
				activityId: activity.id,
			}),
			{
				loading: "비교과 활동 삭제 중...",
				success: (_) => {
					setOpen(false);
					return `비교과 활동이 삭제되었습니다.`;
				},
				error: "비교과 활동 삭제에 실패했습니다.",
			},
		);
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
				<Button
					variant="ghost"
					size="sm"
					className="h-3 w-3 p-0"
					onClick={() => console.log(activity.id)}
				>
					<Trash2 className="w-2 h-2 text-destructive" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>비교과 활동 삭제</AlertDialogTitle>
				</AlertDialogHeader>
				<div className="flex flex-col gap-2 text-muted-foreground">
					<p>{activity.name}를 삭제하시겠습니까?</p>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel>취소</AlertDialogCancel>
					<Button onClick={onSubmit}>삭제</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteActivityDialog;
