import { z } from "zod";

const signInSchema = z.object({
  adminId: z.string().nonempty("아이디를 입력해주세요."),
  password: z.string().nonempty("비밀번호를 입력해주세요."),
})

export { signInSchema };
