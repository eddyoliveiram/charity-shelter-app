import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import { UserIcon, PhoneIcon,  UsersIcon, UtensilsIcon } from '../icons';

interface ShelterCardProps {
    name: string;
    description: string;
    location: string;
    capacity: number;
    hasFood: boolean;
}

export default function ShelterCard({ name, description, location, capacity, hasFood }: ShelterCardProps) {
    return (
        <Card className="space-y-4">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5" />
                        <span>{name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <PhoneIcon className="w-5 h-5" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <UsersIcon className="w-5 h-5" />
                        <span>Capacidade: {capacity} pessoas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <UtensilsIcon className="w-5 h-5" />
                        <span>{hasFood ? 'Alimentação disponível' : 'Sem alimentação'}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
