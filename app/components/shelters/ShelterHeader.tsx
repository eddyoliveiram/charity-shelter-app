import { ReactNode } from 'react';

interface ShelterHeaderProps {
    title: string;
    subtitle: string;
    icon: ReactNode;
}

export default function ShelterHeader({ title, subtitle, icon }: ShelterHeaderProps) {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">{icon}</div>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                <p className="text-muted-foreground">{subtitle}</p>
            </div>
        </div>
    );
}
