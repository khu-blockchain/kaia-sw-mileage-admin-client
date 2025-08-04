import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ISignUpForm, signUpSchema } from '@/features/admin/form';

const useSignUpForm = () => {
  return useForm<ISignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      id: '',
      password: '',
      confirm_password: '',
      email: '',
      name: '',
      wallet_address: ''
    }
  })
}

export{
  useSignUpForm
}