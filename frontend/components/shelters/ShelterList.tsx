import { Card } from '@/components/ui/Card';

export default function ShelterList() {
    const shelters = [
        { name: 'Casa da Maria', capacity: 4, location: 'Rua das Flores, 123 - Centro', hasFood: true },
        { name: 'Casa do João', capacity: 2, location: 'Rua das Árvores, 456 - Jardim', hasFood: false },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {shelters.map((shelter) => (
                <Card key={shelter.name} className="space-y-4">
                    <h2 className="text-xl font-bold">{shelter.name}</h2>
                    <p>Capacidade: {shelter.capacity}</p>
                    <p>Localização: {shelter.location}</p>
                    <p>{shelter.hasFood ? 'Alimentação disponível' : 'Sem alimentação'}</p>
                </Card>
            ))}
        </div>
    );
}
