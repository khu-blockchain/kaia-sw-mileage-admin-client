import { z } from "zod";

const signUpSchema = z.object({
  id: z.string().nonempty("아이디를 입력해주세요."),
  password: z.string().nonempty("비밀번호를 입력해주세요."),
  confirm_password: z.string(),
  email: z.string()
    .nonempty("이메일을 입력해주세요.")
    .email('올바른 이메일 형식이 아닙니다.'),
  name: z.string().nonempty("이름을 입력해주세요."),
  wallet_address: z.string().nonempty("지갑주소를 입력해주세요."),
}).refine((data) => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: "비밀번호가 일치하지 않습니다.",
})

type ISignUpForm = z.infer<typeof signUpSchema>;

export {
  signUpSchema
}

export type {
  ISignUpForm
}