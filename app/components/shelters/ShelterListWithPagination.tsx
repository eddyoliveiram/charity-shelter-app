"use client";
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import HomeIcon from '../icons/HomeIcon';
import PhoneIcon from '../icons/PhoneIcon';
import UserIcon from '../icons/UserIcon';
import UsersIcon from '../icons/UsersIcon';
import UtensilsIcon from '../icons/UtensilsIcon';

export default function ShelterListWithPagination() {
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
        {
            name: 'Casa do Pedro',
            description: 'Abrigo com capacidade para 5 pessoas, sem alimentação.',
            phone: '(**) *****-****',
            location: 'Rua das Pedras, *** - Bairro Alto',
            capacity: 5,
            hasFood: false,
        },
        {
            name: 'Casa da Júlia',
            description: 'Abrigo com capacidade para 3 pessoas, com alimentação disponível.',
            phone: '(**) *****-****',
            location: 'Rua das Rosas, *** - Centro',
            capacity: 3,
            hasFood: true,
        },
        {
            name: 'Casa do Carlos',
            description: 'Abrigo com capacidade para 2 pessoas, com alimentação disponível.',
            phone: '(**) *****-****',
            location: 'Rua dos Lagos, *** - Vila Nova',
            capacity: 2,
            hasFood: true,
        },
        {
            name: 'Casa do Ricardo',
            description: 'Abrigo com capacidade para 6 pessoas, sem alimentação.',
            phone: '(**) *****-****',
            location: 'Rua dos Pássaros, *** - Bairro Novo',
            capacity: 6,
            hasFood: false,
        },
        {
            name: 'Casa da Joana',
            description: 'Abrigo com capacidade para 4 pessoas, com alimentação disponível.',
            phone: '(**) *****-****',
            location: 'Rua das Palmeiras, *** - Jardim das Flores',
            capacity: 4,
            hasFood: true,
        },
        {
            name: 'Casa do Roberto',
            description: 'Abrigo com capacidade para 5 pessoas, sem alimentação.',
            phone: '(**) *****-****',
            location: 'Rua das Acácias, *** - Vila Verde',
            capacity: 5,
            hasFood: false,
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const sheltersPerPage = 3;

    const indexOfLastShelter = currentPage * sheltersPerPage;
    const indexOfFirstShelter = indexOfLastShelter - sheltersPerPage;
    const currentShelters = shelters.slice(indexOfFirstShelter, indexOfLastShelter);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(shelters.length / sheltersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {/* Lista de Abrigos Paginados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentShelters.map((shelter, index) => (
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

                                <div className="flex gap-4 mt-4">
                                    <button className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600">
                                        Solicitar
                                    </button>
                                    <button className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Paginação */}
            <div className="flex justify-center mt-6">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`mx-1 px-3 py-1 border ${
                            currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}
