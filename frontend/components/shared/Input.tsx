// components/shared/Input.tsx
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
    return <input className="border border-gray-300 p-2 w-full" {...props} />;
}
