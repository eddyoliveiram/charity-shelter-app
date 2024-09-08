"use client";
import { useState, useEffect } from 'react';
import api from '@/app/utils/axiosConfig';
import { getCookie } from 'cookies-next';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faHome, faUser, faUsers, faUtensils, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/app/components/ui/button";
import Swal from 'sweetalert2'; // Importando SweetAlert2

export default function ShelterListWithPagination() {
    const [shelters, setShelters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const sheltersPerPage = 3;
    const [seekerId, setSeekerId] = useState(null); // Para armazenar o seeker_id

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const userInfo = JSON.parse(getCookie('user_info'));
                const userId = userInfo.id;
                setSeekerId(userId); // Armazena o seeker_id
                const response = await api.get(`/providers/all/${userId}`);
                setShelters(response.data);
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

    const handleRequestShelter = async (providerId) => {
        Swal.fire({
            title: 'Tem certeza que deseja solicitar este abrigo?',
            text: 'Esta ação enviará sua solicitação para o provedor.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, solicitar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await api.post('/seekers/request', {
                        seeker_id: seekerId,
                        provider_id: providerId
                    });

                    // Atualiza o estado local dos abrigos
                    setShelters(prevShelters =>
                        prevShelters.map(shelter =>
                            shelter.user_id === providerId
                                ? { ...shelter, status: 'Aguardando' } // Atualiza o status para "Aguardando"
                                : shelter
                        )
                    );

                    Swal.fire('Solicitado!', 'Você solicitou o abrigo com sucesso.', 'success');
                } catch (error) {
                    Swal.fire('Erro!', 'Houve um erro ao solicitar o abrigo.', 'error');
                    console.error('Erro ao solicitar abrigo:', error);
                }
            }
        });
    };

    const deleteRequestShelter = async (requestId) => {
        Swal.fire({
            title: 'Tem certeza que deseja cancelar esta solicitação?',
            text: 'Esta ação cancelará sua solicitação ao provedor.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, cancelar!',
            cancelButtonText: 'Manter'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/seekers/request/${requestId}`);

                    // Remove a solicitação da lista atual de abrigos
                    setShelters(prevShelters =>
                        prevShelters.map(shelter =>
                            shelter.request_id === requestId
                                ? { ...shelter, status: null } // Reseta o status para null
                                : shelter
                        )
                    );

                    Swal.fire('Cancelado!', 'Você cancelou a solicitação com sucesso.', 'success');
                } catch (error) {
                    Swal.fire('Erro!', 'Houve um erro ao cancelar a solicitação.', 'error');
                    console.error('Erro ao cancelar a solicitação:', error);
                }
            }
        });
    };

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
                                        {shelter.status === 'Aceito' ? <span className={'text-xl text-constructive'}> {shelter.phone} </span>: '(**) *****-****'}
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
                                    <Button
                                        className="bg-primary text-primary-foreground py-1 px-4 mr-2 rounded"
                                        onClick={() => handleRequestShelter(shelter.user_id)}
                                    >
                                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                        Solicitar
                                    </Button>
                                )}
                                {shelter.status === 'Aguardando' && (
                                    <>
                                        <span className="mr-2">Status: Aguardando</span>
                                        <Button className="bg-destructive text-destructive-foreground py-1 px-4 rounded"
                                                onClick={() => deleteRequestShelter(shelter.request_id)}>
                                            <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                            Cancelar
                                        </Button>
                                    </>
                                )}
                                {shelter.status === 'Aceito' && (
                                    <div>
                                        <span className="text-xl text-constructive">Status: Aceito</span>
                                        <div className={'mt-2'}>Entre em contato pelo número disponibilizado.</div>
                                    </div>
                                )}


                                {shelter.status === 'Negado' && (
                                    <span className={'text-xl text-destructive'}>Status: Negado</span>
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
