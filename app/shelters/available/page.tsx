"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faHouseUser, faSave, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { getCookie, setCookie } from 'cookies-next';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/Select";
import ShelterListWithPagination from '@/app/components/shelters/ShelterListWithPagination'
import api from '@/app/utils/axiosConfig';
import Swal from "sweetalert2"; // Certifique-se de que este caminho está correto

export default function ShelterDashboard() {
    const [activeTab, setActiveTab] = useState('shelters');
    const [userName, setUserName] = useState('');
    const [seekerId, setSeekerId] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [updateMessage, setUpdateMessage] = useState('');
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        group_size: '',
        need_type: '',
        seeker_description: ''
    });

    // Função de logout com SweetAlert2
    const handleLogout = () => {
        Swal.fire({
            title: 'Tem certeza que deseja sair?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, sair',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setCookie('token', '', { maxAge: -1, path: '/' });
                setCookie('user_info', '', { maxAge: -1, path: '/' });
                window.location.href = '/login'; // Redireciona para a página de login
            }
        });
    };

    useEffect(() => {
        const userInfo = getCookie('user_info');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setUserName(user.name);
            setSeekerId(user.id);
        }
    }, []);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (seekerId && activeTab === 'dados') {
                try {
                    setLoadingProfile(true);
                    const response = await api.get(`/seekers/${seekerId}/profile`);
                    setProfileData(response.data);
                    setLoadingProfile(false);
                } catch (error) {
                    console.error('Erro ao buscar dados do seeker:', error);
                    setLoadingProfile(false);
                }
            }
        };
        fetchProfileData();
    }, [seekerId, activeTab]);

    async function handleSubmit(event : React.FormEvent) {
        event.preventDefault();

        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você quer atualizar seus dados?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, atualizar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await api.put('/seekers/update', {
                        user_id: seekerId,
                        name: profileData.name,
                        email: profileData.email,
                        phone: profileData.phone,
                        group_size: profileData.group_size,
                        need_type: profileData.need_type,
                        seeker_description: profileData.seeker_description
                    });

                    const updatedUserInfo = { id: seekerId, name: profileData.name, email: profileData.email };
                    setCookie('user_info', JSON.stringify(updatedUserInfo));

                    setUserName(profileData.name);

                    setUpdateMessage('Perfil atualizado com sucesso!');
                    Swal.fire('Atualizado!', 'Seus dados foram atualizados com sucesso.', 'success');
                } catch (error) {
                    setUpdateMessage('Erro ao atualizar o perfil.');
                    Swal.fire('Erro!', 'Houve um erro ao atualizar seus dados.', 'error');
                    console.error('Erro ao atualizar perfil:', error);
                }
            }
        });
    }

    // Função para solicitar abrigo com SweetAlert2
    const handleRequestShelter = async (providerId :number) => {
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
                    Swal.fire('Solicitado!', 'Você solicitou o abrigo com sucesso.', 'success');
                } catch (error) {
                    Swal.fire('Erro!', 'Houve um erro ao solicitar o abrigo.', 'error');
                    console.error('Erro ao solicitar abrigo:', error);
                }
            }
        });
    };

    // Função para cancelar a solicitação com SweetAlert2
    const handleCancelRequest = async (requestId :number) => {
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
                    const response = await api.delete(`/seekers/request/${requestId}`);
                    Swal.fire('Cancelado!', 'Você cancelou a solicitação com sucesso.', 'success');
                } catch (error) {
                    Swal.fire('Erro!', 'Houve um erro ao cancelar a solicitação.', 'error');
                    console.error('Erro ao cancelar solicitação:', error);
                }
            }
        });
    };

    return (
        <div className="container mx-auto py-12">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Olá, {userName || ''}.</h1>
                <a onClick={handleLogout}
                   className="flex items-center text-lg py-2 px-4 bg-secondary text-secondary-foreground rounded-md cursor-pointer">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2"/> Logout
                </a>
            </div>

            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-start items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
                    <button
                        className={`flex items-center text-lg sm:text-xl py-4 px-6 w-full sm:w-auto rounded-md  ${activeTab === 'shelters' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                        onClick={() => setActiveTab('shelters')}
                    >
                        <FontAwesomeIcon icon={faHouseUser} className="mr-2" />
                        <span>Abrigos</span>
                    </button>
                    <button
                        className={`flex items-center text-lg sm:text-xl py-4 px-6 w-full sm:w-auto rounded-md  ${activeTab === 'dados' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                        onClick={() => setActiveTab('dados')}
                    >
                        <FontAwesomeIcon icon={faUserCog} className="mr-2" />
                        <span>Alterar Dados Cadastrais</span>
                    </button>
                </div>
            </div>

            {activeTab === 'shelters' && (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Abrigos Disponíveis</h1>
                    <p>Abaixo estão os abrigos temporários disponíveis para você.</p>
                    <ShelterListWithPagination />
                </div>
            )}

            {activeTab === 'dados' && (
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Alterar Dados Cadastrais</h2>
                    {loadingProfile ? (
                        <p>Carregando dados...</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name">Nome</label>
                                    <input id="name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} placeholder="Seu nome" className="w-full border border-input p-2 rounded" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} placeholder="seu@email.com" className="w-full border border-input p-2 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="phone">Telefone</label>
                                    <input id="phone" type="tel" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} placeholder="(00) 00000-0000" className="w-full border border-input p-2 rounded" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="group_size">Número de Pessoas</label>
                                    <input id="group_size" type="number" value={profileData.group_size} onChange={(e) => setProfileData({ ...profileData, group_size: e.target.value })} placeholder="Número de pessoas no grupo" className="w-full border border-input p-2 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="need_type">Necessidade</label>
                                    <Select value={profileData.need_type} onValueChange={(value) => setProfileData({
                                        ...profileData,
                                        need_type: value
                                    })}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Acomodação">Apenas Acomodação</SelectItem>
                                                <SelectItem value="Acomodação e Alimentação">Acomodação e
                                                    Alimentação</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="seeker_description">Descrição</label>
                                <textarea id="seeker_description" value={profileData.seeker_description}
                                          onChange={(e) => setProfileData({
                                              ...profileData,
                                              seeker_description: e.target.value
                                          })} rows={3} placeholder="Informações adicionais sobre sua necessidade"
                                          className="w-full border border-input p-2 rounded"></textarea>
                            </div>

                            <Button type="submit" className="w-full bg-primary text-primary-foreground py-6">
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
                                Salvar
                            </Button>
                        </form>
                    )}
                    {updateMessage && <p className="mt-4 text-center text-green-600">{updateMessage}</p>}
                </div>
            )}
        </div>
    );
}
