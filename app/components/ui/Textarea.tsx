import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    style?: React.CSSProperties;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, style, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                style={{
                    border: '0',
                    backgroundColor: '#faf9ff',
                    borderRadius: '10px',
                    outline: 'none',
                    boxShadow: 'none',
                    padding: '0.5rem',
                    ...style
                }}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
