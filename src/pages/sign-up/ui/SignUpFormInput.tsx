import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input, Label } from "@/shared/ui";

type SignUpFormInputProps = InputHTMLAttributes<HTMLInputElement> &
	UseFormRegisterReturn & {
		label: string;
	};

function SignUpFormInput({
	label,
	id,
	type,
	placeholder,
	autoComplete,
	required,
	...registerField
}: SignUpFormInputProps) {
	return (
		<div className="flex gap-2">
			<Label htmlFor={id} className="w-25">
				{label}
			</Label>
			<div className="relative flex flex-1 w-full">
				<Input
					id={id}
					type={type}
					placeholder={placeholder}
					autoComplete={autoComplete}
					required={required}
					{...registerField}
				/>
			</div>
		</div>
	);
}

export default SignUpFormInput;
