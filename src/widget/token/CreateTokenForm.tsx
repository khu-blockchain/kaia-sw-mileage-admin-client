import {
  useCreateTokenForm,
  ICreateTokenForm,
  useCreateToken,
} from "@/features/token";
import { kaia, SW_MILEAGE_FACTORY_ABI } from "@/shared/constants";
import {
  Label,
  Input,
  Textarea,
  Separator,
  Button,
  Spinner,
} from "@/shared/ui";
import { encodeContractExecutionABI } from "@/shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CreateTokenForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useCreateTokenForm();

  const onSubmit = async (createTokenForm: ICreateTokenForm) => {
    const data = encodeContractExecutionABI(
      SW_MILEAGE_FACTORY_ABI,
      "deployWithAdmin",
      [
        createTokenForm.swMileageTokenName,
        createTokenForm.symbol,
        import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
      ]
    );

    const { rawTransaction } = await kaia.wallet.klaySignTransaction({
      type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
      to: import.meta.env.VITE_SW_MILEAGE_TOKEN_FACTORY_ADDRESS,
      from: kaia.browserProvider.selectedAddress,
      data: data,
      value: "0x0",
      gas: "0x4C4B40",
    });

    mutate({
      ...createTokenForm,
      imageUrl: "https://i.ibb.co/mVbb4sV5/image.png",
      rawTransaction: rawTransaction,
    });
  };

  const { mutate, isPending } = useCreateToken({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-sw-mileage-token-list"],
        refetchType: "all",
      });
      navigate("/manage-token");
      toast.success("토큰 배포가 완료되었습니다.");
    },
    onError: () => {
      toast.error("토큰 배포에 실패했습니다.");
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="content-container">
      <p className="text-xl font-semibold text-body">토큰 정보</p>
      <div className="flex w-full justify-between">
        <div className="grid gap-2">
          <div className="flex justify-between w-60">
            <Label htmlFor="password">이름</Label>
          </div>
          <Input
            className="w-100"
            id="name"
            type="text"
            maxLength={20}
            required
            placeholder="토큰의 이름을 입력하세요. (최대 20자)"
            {...register("swMileageTokenName")}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between w-60">
            <Label htmlFor="password">심볼</Label>
          </div>
          <Input
            className="w-100"
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
      <Separator className="my-4" />
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
};

export default CreateTokenForm;
