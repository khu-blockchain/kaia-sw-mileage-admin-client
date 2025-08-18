import type { RawTransaction } from "@shared/lib/web3";
import type { ICreateTokenForm } from "../model";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { STUDENT_MANAGER_ABI } from "@shared/config";
import { encodeContractExecutionABI, kaia, KaiaTxType } from "@shared/lib/web3";
import {
	Button,
	Input,
	Label,
	Separator,
	Spinner,
	Textarea,
} from "@/shared/ui";

import { useCreateMileageToken } from "../api";
import { createTokenSchema } from "../model";

export default function CreateTokenForm() {
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm<ICreateTokenForm>({
		resolver: zodResolver(createTokenSchema),
		defaultValues: {
			name: "",
			symbol: "",
			description: "",
		},
	});

	const onSubmit = async (createTokenForm: ICreateTokenForm) => {
		const data = encodeContractExecutionABI(
			STUDENT_MANAGER_ABI,
			"deployWithAdmin",
			[
				createTokenForm.name,
				createTokenForm.symbol,
				import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
			],
		);

		const rawTransaction = (await kaia.wallet.signTransaction({
			type: KaiaTxType.FeeDelegatedSmartContractExecution,
			to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
			from: kaia.browserProvider.selectedAddress,
			data: data,
			value: "0x0",
			gas: "0x4C4B40",
		})) as RawTransaction;

		try {
      await mutateAsync({
        ...createTokenForm,
        imageUrl: "https://i.ibb.co/mVbb4sV5/image.png",
        rawTransaction: rawTransaction,
      });
      navigate(`/manage-token`);
      toast.success("토큰 배포가 완료되었습니다.", {
        description: "블록체인에 반영되는데 시간이 소요될 수 있습니다.",
      });
		} catch (error) {
			toast.error("토큰 배포에 실패했습니다.");
		}

	
	};

	const { mutateAsync, isPending } = useCreateMileageToken();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="content-container">
			<p className="text-xl font-semibold text-body">토큰 정보</p>
			<div className="grid grid-cols-2 w-ful gap-6">
				<div className="grid col-span-1 gap-2">
					<div className="flex justify-between w-60">
						<Label htmlFor="password">이름</Label>
					</div>
					<Input
						className="w-full"
						id="name"
						type="text"
						maxLength={20}
						required
						placeholder="토큰의 이름을 입력하세요. (최대 20자)"
						{...register("name")}
					/>
				</div>
				<div className="grid col-span-1 gap-2">
					<div className="flex justify-between w-60">
						<Label htmlFor="password">심볼</Label>
					</div>
					<Input
						className="w-full"
						id="name"
						type="text"
						maxLength={10}
						required
						placeholder="토큰의 심볼을 입력하세요. (최대 10자)"
						{...register("symbol")}
					/>
				</div>
			</div>
			<div className="grid gap-2">
				<div className="flex justify-between w-60">
					<Label htmlFor="password">설명</Label>
				</div>
				<Textarea
					className="resize-none h-20"
					id="name"
					maxLength={80}
					required
					placeholder="토큰에 대한 설명을 작성해주세요. (최대 80자)"
					{...register("description")}
				/>
			</div>
			<Separator />
			<Button type="submit" className="w-min" disabled={isPending}>
				{isPending ? (
					<div className="flex items-center gap-1">
						<Spinner />
						<span>배포중...</span>
					</div>
				) : (
					"배포하기"
				)}
			</Button>
		</form>
	);
}
