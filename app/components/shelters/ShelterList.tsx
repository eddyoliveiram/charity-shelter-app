import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import HomeIcon from '../icons/HomeIcon';
import PhoneIcon from '../icons/PhoneIcon';
import UserIcon from '../icons/UserIcon';
import UsersIcon from '../icons/UsersIcon';
import UtensilsIcon from '../icons/UtensilsIcon';

export default function ShelterList() {
    const shelters = [
        {
            name: 'Casa da Maria',
            description: 'Abrigo com capacidade para 4 pessoas, com alimentação disponível.',
            phone: '(**) *****-****',
            location: 'Rua das Flores, *** - Centro',
            capacity: 4,
            hasFood: true,
        },
        {
            name: 'Casa do João',
            description: 'Abrigo com capacidade para 2 pessoas, sem alimentação.',
            phone: '(**) *****-****',
            location: 'Rua das Árvores, *** - Jardim',
            capacity: 2,
            hasFood: false,
        },
        {
            name: 'Casa da Ana',
            description: 'Abrigo com capacidade para 6 pessoas, com alimentação disponível.',
            phone: '(**) *****-****',
            location: 'Rua das Nuvens, *** - Parque',
            capacity: 6,
            hasFood: true,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {shelters.map((shelter, index) => (
                <Card key={index} className="space-y-4">
                    <CardHeader>
                        <CardTitle>{shelter.name}</CardTitle>
                        <CardDescription>{shelter.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-5 h-5" />
                                <span>{shelter.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="w-5 h-5" />
                                <span>{shelter.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <HomeIcon size={20} className="w-5 h-5" />
                                <span>{shelter.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UsersIcon className="w-5 h-5" />
                                <span>Capacidade: {shelter.capacity} pessoas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UtensilsIcon className="w-5 h-5" />
                                <span>{shelter.hasFood ? 'Alimentação disponível' : 'Sem alimentação'}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
