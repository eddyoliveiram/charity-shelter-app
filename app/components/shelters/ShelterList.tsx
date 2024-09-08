import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import HomeIcon from '../icons/HomeIcon';
import PhoneIcon from '../icons/PhoneIcon';
import UserIcon from '../icons/UserIcon';
import UsersIcon from '../icons/UsersIcon';
import UtensilsIcon from '../icons/UtensilsIcon';

export default function ShelterList({ providers }) { // Recebe 'providers' como prop
    if (providers.length === 0) {
        return <p>No shelters available</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {providers.map((shelter) => (
                <Card key={shelter.user_id} className="space-y-4">
                    <CardHeader>
                        <CardTitle>{shelter.name}</CardTitle>
                        <CardDescription>{shelter.provider_description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-5 h-5" />
                                <span>{shelter.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="w-5 h-5" />
                                <span>{'(**)*****-****'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UsersIcon className="w-5 h-5" />
                                <span>Capacidade: {shelter.capacity} pessoas</span>
                            </div>
                            { shelter.support_type === 'Acomodação e alimentação' && (
                                <div className="flex items-center gap-2">
                                    <UtensilsIcon className="w-5 h-5" />
                                    <span>Alimentação disponível</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
