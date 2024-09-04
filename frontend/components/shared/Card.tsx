// components/shared/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div className={`border border-gray-200 p-4 rounded-md shadow-sm ${className}`}>
            {children}
        </div>
    );
}
