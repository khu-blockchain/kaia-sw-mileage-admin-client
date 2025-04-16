import { useSignUpForm, useSignUp, ISignUpForm } from "@/features/admin";
import { RowLabelFormInput, ErrorMessage, ConnectButton } from "@/shared/component";
import { Separator, Input, Button } from "@/shared/ui";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";


const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useSignUpForm();

  const { mutate, isPending } = useSignUp({
    onSuccess: (response) => {
      toast(`${response.admin.name}님, 회원가입이 완료되었습니다.`);
      navigate("/sign-in");
    },
    onError: () => {},
  });

  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    mutate({
      adminId: data.id,
      password: data.password,
      passwordConfirm: data.confirm_password,
      name: data.name,
      email: data.email,
      walletAddress: data.wallet_address,
    });
  };

  const setWalletAddress = (address: string[]) => {
    clearErrors("wallet_address");
    setValue("wallet_address", address[0]);
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
        <RowLabelFormInput
          label="아이디"
          id="id"
          type="text"
          placeholder="아이디를 입력해주세요."
          {...register("id")}
          required
        />
        <RowLabelFormInput
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password")}
          required
        />
        <RowLabelFormInput
          label="비밀번호 확인"
          id="confirm-password"
          type="password"
          placeholder="동일한 비밀번호를 입력해주세요."
          {...register("confirm_password")}
          required
        />
        {(errors.id?.message ||
          errors.password?.message ||
          errors.confirm_password?.message) && (
          <ErrorMessage
            className="ml-30"
            errors={errors}
            fields={[
              { field: "id", label: "아이디" },
              { field: "password", label: "비밀번호" },
              { field: "confirm_password", label: "비밀번호 확인" },
            ]}
          />
        )}
        <Separator />
        <RowLabelFormInput
          label="이름"
          id="name"
          type="text"
          placeholder="이름을 입력해주세요."
          {...register("name")}
          required
          autoComplete="off"
        />
        <RowLabelFormInput
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
          <Input
            disabled={true}
            id="wallet_address"
            type="text"
            autoComplete="off"
            placeholder="연결된 지갑의 주소가 표시됩니다."
            {...register("wallet_address")}
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
      {!watch("wallet_address") ? (
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
