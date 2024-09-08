"use client";
import { useState, useEffect } from 'react';
import api from '@/app/utils/axiosConfig';
import { getCookie } from 'cookies-next';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faHome, faUser, faUsers, faUtensils, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/app/components/ui/button";

export default function ShelterListWithPagination() {
    const [shelters, setShelters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const sheltersPerPage = 3;

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const userId = JSON.parse(getCookie('user_info')).id;
                const response = await api.get(`/providers/all/${userId}`);
                setShelters(response.data); // Ajuste conforme a estrutura dos dados retornados
            } catch (error) {
                console.error("Error fetching shelters", error);
            }
        };

        fetchShelters();
    }, []);

    const indexOfLastShelter = currentPage * sheltersPerPage;
    const indexOfFirstShelter = indexOfLastShelter - sheltersPerPage;
    const currentShelters = shelters.slice(indexOfFirstShelter, indexOfLastShelter);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(shelters.length / sheltersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                {currentShelters.map((shelter, index) => (
                    <Card key={index} className="space-y-4">
                        <CardHeader>
                            <CardTitle>{shelter.name}</CardTitle>
                            <CardDescription>{shelter.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                                    <span>{shelter.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
                                    <span>
                                        {shelter.status === 'Aceito' ? shelter.phone : '(**) *****-****'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
                                    <span>Capacidade: {shelter.capacity} pessoas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faUtensils} className="w-5 h-5" />
                                    <span>{shelter.hasFood ? 'Alimentação disponível' : 'Sem alimentação'}</span>
                                </div>
                            </div>
                            <div className="flex mt-4">
                                {shelter.status === null && (
                                    <Button className="bg-primary text-primary-foreground py-1 px-4 mr-2 rounded">
                                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                        Solicitar
                                    </Button>
                                )}
                                {shelter.status === 'Aguardando' && (
                                    <>
                                        <span className="mr-2">Status: Aguardando</span>
                                        <Button className="bg-destructive text-destructive-foreground py-1 px-4 rounded">
                                            <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                            Cancelar
                                        </Button>
                                    </>
                                )}
                                {shelter.status === 'Aceito' && (
                                    <span>Status: Aceito</span>
                                )}
                                {shelter.status === 'Negado' && (
                                    <span>Status: Negado</span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`mx-1 px-4 py-1 text-lg border rounded ${
                            currentPage === number ? 'bg-primary text-primary-foreground' : ''
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}
