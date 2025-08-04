import type { Address } from "@shared/lib/web3";
import type { SubmitHandler } from "react-hook-form";
import type { ISignUpForm } from "../model";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { ConnectButton } from "@features/connect-wallet";
import { Button, ErrorMessage, Separator } from "@/shared/ui";

import { useAdminSignUp } from "../api";
import { signUpSchema } from "../model";
import SignUpFormInput from "./SignUpFormInput";

const SignUpForm = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		watch,
		formState: { errors },
	} = useForm<ISignUpForm>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			id: "",
			password: "",
			confirmPassword: "",
			email: "",
			name: "",
			walletAddress: "",
		},
	});

	const { mutateAsync, isPending } = useAdminSignUp();

	const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
		try {
			const response = await mutateAsync({
				adminId: data.id,
				password: data.password,
				passwordConfirm: data.confirmPassword,
				name: data.name,
				email: data.email,
				walletAddress: data.walletAddress as Address,
			});

			toast.success(`${response.name}님, 회원가입이 완료되었습니다.`);
			navigate("/sign-in");
		} catch (error) {
			toast.error("회원가입에 실패했습니다.");
		}
	};

	const setWalletAddress = (address: string[]) => {
		clearErrors("walletAddress");
		setValue("walletAddress", address[0]);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-med font-bold">회원가입</h1>
				<p className="text-sm text-muted-foreground whitespace-pre-wrap">
					<span>
						{"회원가입 진행 전, Kaia Wallet이 설치되어 있지 않다면\n"}
					</span>
					<span>
						<a
							target="_blank"
							href="https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi?hl=ko"
							className="underline underline-offset-4"
						>
							Chrome 웹 스토어
						</a>
						를 통해 설치해주세요.
					</span>
				</p>
			</div>
			<div className="grid gap-4">
				<SignUpFormInput
					label="아이디"
					id="id"
					type="text"
					placeholder="아이디를 입력해주세요."
					{...register("id")}
					required
				/>
				<SignUpFormInput
					label="비밀번호"
					id="password"
					type="password"
					placeholder="비밀번호를 입력해주세요."
					{...register("password")}
					required
				/>
				<SignUpFormInput
					label="비밀번호 확인"
					id="confirm-password"
					type="password"
					placeholder="동일한 비밀번호를 입력해주세요."
					{...register("confirmPassword")}
					required
				/>
				{(errors.id?.message ||
					errors.password?.message ||
					errors.confirmPassword?.message) && (
					<ErrorMessage
						className="ml-30"
						errors={errors}
						fields={[
							{ field: "id", label: "아이디" },
							{ field: "password", label: "비밀번호" },
							{ field: "confirmPassword", label: "비밀번호 확인" },
						]}
					/>
				)}
				<Separator />
				<SignUpFormInput
					label="이름"
					id="name"
					type="text"
					placeholder="이름을 입력해주세요."
					{...register("name")}
					required
					autoComplete="off"
				/>
				<SignUpFormInput
					label="이메일"
					id="email"
					type="text"
					placeholder="이메일을 입력해주세요."
					{...register("email")}
					required
					autoComplete="off"
				/>
				{(errors.name?.message || errors.email?.message) && (
					<ErrorMessage
						className="ml-30"
						errors={errors}
						fields={[
							{ field: "name", label: "이름" },
							{ field: "email", label: "이메일" },
						]}
					/>
				)}
				<Separator />
				<div className="flex flex-col gap-4">
					<SignUpFormInput
						label="지갑 주소"
						id="walletAddress"
						disabled={true}
						type="text"
						autoComplete="off"
						placeholder="연결된 지갑의 주소가 표시됩니다."
						{...register("walletAddress")}
					/>
					<ul className="list-disc ml-4">
						<li className="text-xs text-muted-foreground whitespace-pre-wrap">
							아래의 지갑 연결 버튼을 눌러 Kaia를 연결하세요.
						</li>
						<li className="text-xs text-muted-foreground whitespace-pre-wrap">
							Kaia가 열리지 않는다면 페이지를 새로고침 해주세요.
						</li>
						<li className="text-xs text-destructive whitespace-pre-wrap">
							*주의* 회원가입시 등록되는 지갑 주소는 변경할 수 없습니다. 지갑
							주소를 꼭 확인하세요.
						</li>
					</ul>
				</div>
			</div>
			<Separator />
			{!watch("walletAddress") ? (
				<ConnectButton.DefaultButton
					connectCallback={setWalletAddress}
					className="w-full"
				/>
			) : (
				<Button disabled={isPending} type="submit" className="w-full">
					회원가입
				</Button>
			)}
			<div className="text-center text-sm">
				계정이 이미 존재하나요?{" "}
				<a href="/sign-in" className="text-link">
					로그인
				</a>
			</div>
		</form>
	);
};

export { SignUpForm };
