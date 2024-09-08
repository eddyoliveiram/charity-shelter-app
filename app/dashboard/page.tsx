"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faClipboardList, faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { getCookie, setCookie } from 'cookies-next';
import api from '@/app/utils/axiosConfig';
import Swal from 'sweetalert2';

export default function ShelterDashboard() {
    const [activeTab, setActiveTab] = useState('solicitacoes');
    const [userName, setUserName] = useState('');
    const [providerId, setProviderId] = useState(null);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loadingSolicitacoes, setLoadingSolicitacoes] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [updateMessage, setUpdateMessage] = useState('');

    const handleLogout = () => {
        const userInfo = getCookie('user_info');
        const user = userInfo ? JSON.parse(userInfo) : null;
        const userRole = user ? user.role : null; // Obtém o tipo de usuário (seeker ou provider)

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
                // Remove os cookies e redireciona com base no tipo de usuário
                setCookie('token', '', { maxAge: -1, path: '/' });
                setCookie('user_info', '', { maxAge: -1, path: '/' });
                window.location.href = '/login'; // Redireciona para a página de login
            }
        });
    };


    // State para os dados do provider
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        capacity: '',
        support_type: '',
        provider_description: ''
    });

    const solicitacoesPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastSolicitacao = currentPage * solicitacoesPerPage;
    const indexOfFirstSolicitacao = indexOfLastSolicitacao - solicitacoesPerPage;
    const currentSolicitacoes = solicitacoes.slice(indexOfFirstSolicitacao, indexOfLastSolicitacao);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(solicitacoes.length / solicitacoesPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        const userInfo = getCookie('user_info');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setUserName(user.name);
            setProviderId(user.id);
        }
    }, []);

    useEffect(() => {
        const fetchSolicitacoes = async () => {
            if (providerId) {
                try {
                    setLoadingSolicitacoes(true);
                    const response = await api.get(`/requests/provider/${providerId}`);
                    setSolicitacoes(response.data);
                    setLoadingSolicitacoes(false);
                } catch (error) {
                    console.error('Erro ao buscar solicitações:', error);
                    setLoadingSolicitacoes(false);
                }
            }
        };
        fetchSolicitacoes();
    }, [providerId]);

    useEffect(() => {
        const fetchProviderData = async () => {
            if (providerId && activeTab === 'dados') {
                try {
                    setLoadingProfile(true);
                    const response = await api.get(`/providers/${providerId}/profile`);
                    setProfileData(response.data);
                    setLoadingProfile(false);
                } catch (error) {
                    console.error('Erro ao buscar dados do provider:', error);
                    setLoadingProfile(false);
                }
            }
        };
        fetchProviderData();
    }, [providerId, activeTab]);

    async function handleSubmit(event) {
        event.preventDefault();

        // Adicionando SweetAlert para confirmação ao alterar dados
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
                    const response = await api.put('/providers/update', {
                        user_id: providerId,
                        name: profileData.name,
                        email: profileData.email,
                        phone: profileData.phone,
                        capacity: profileData.capacity,
                        support_type: profileData.support_type,
                        provider_description: profileData.provider_description
                    });

                    const updatedUserInfo = { id: providerId, name: profileData.name, email: profileData.email };
                    setCookie('user_info', JSON.stringify(updatedUserInfo));

                    setUserName(profileData.name);

                    setUpdateMessage('Perfil atualizado com sucesso!');
                    Swal.fire('Atualizado!', 'Seus dados foram atualizados.', 'success');
                } catch (error) {
                    setUpdateMessage('Erro ao atualizar o perfil.');
                    Swal.fire('Erro!', 'Houve um erro ao atualizar seus dados.', 'error');
                    console.error('Erro ao atualizar perfil:', error);
                }
            }
        });
    }

    // Função para atualizar o status da solicitação com confirmação
    async function updateRequestStatus(requestId, status) {
        const action = status === 'Aceito' ? 'aceitar' : 'rejeitar';

        Swal.fire({
            title: `Você quer ${action} esta solicitação?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Sim, ${action}!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.put(`/requests/${requestId}/status`, { status });
                    setSolicitacoes((prevSolicitacoes) =>
                        prevSolicitacoes.map((solicitacao) =>
                            solicitacao.id === requestId
                                ? { ...solicitacao, status }
                                : solicitacao
                        )
                    );
                    Swal.fire(`${action.charAt(0).toUpperCase() + action.slice(1)}!`, `A solicitação foi ${action} com sucesso.`, 'success');
                } catch (error) {
                    console.error('Erro ao atualizar o status da solicitação:', error);
                    Swal.fire('Erro!', 'Não foi possível atualizar o status da solicitação.', 'error');
                }
            }
        });
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Olá, {userName || 'Usuário'}.</h1>
                <div>
                    <a onClick={handleLogout}
                       className="flex items-center text-lg py-2 px-4 bg-secondary text-secondary-foreground rounded-md cursor-pointer">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2"/> Logout
                    </a>
                </div>
            </div>

            <div
                className="flex flex-col sm:flex-row sm:justify-start items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
                <button
                    className={`flex items-center text-lg sm:text-xl py-4 px-6 w-full sm:w-auto rounded-md ${activeTab === 'solicitacoes' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                    onClick={() => setActiveTab('solicitacoes')}
                >
                    <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                    Solicitações
                </button>
                <button
                    className={`flex items-center text-lg sm:text-xl py-4 px-6 w-full sm:w-auto rounded-md ${activeTab === 'dados' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                    onClick={() => setActiveTab('dados')}
                >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Alterar Dados Cadastrais
                </button>
            </div>

            {activeTab === 'solicitacoes' && (
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Solicitações para o seu Abrigo</h2>
                    {loadingSolicitacoes ? (
                        <p>Carregando solicitações...</p>
                    ) : solicitacoes.length === 0 ? (
                        <p className="text-gray-600">Não há solicitações para o seu abrigo até o momento.</p>
                    ) : (
                        <>
                            <ul className="mt-4 space-y-4">
                                {currentSolicitacoes.map((solicitacao, index) => (
                                    <li key={index}
                                        className="border border-border p-4 bg-card text-card-foreground rounded-lg shadow-sm">
                                        <div>
                                            <strong>Nome:</strong> {solicitacao.seeker_name}
                                        </div>
                                        <div>
                                            <strong>Número de Pessoas:</strong> {solicitacao.group_size}
                                        </div>
                                        <div>
                                            <strong>Necessidade:</strong> {solicitacao.need_type}
                                        </div>
                                        {solicitacao.status === 'Aceito' && (
                                            <div>
                                                <strong className={''}>Telefone do Solicitante:</strong> <strong
                                                className={'text-constructive text-xl'}>{solicitacao.seeker_phone}</strong>
                                            </div>
                                        )}

                                        <div>
                                            <b>Status:</b>
                                            <span
                                                className={`ml-1 font-bold ${
                                                    solicitacao.status === 'Aceito' ? 'text-constructive' : solicitacao.status === 'Negado' ? 'text-destructive' : 'text-gray-600'
                                                }`}
                                            >
                                            <strong>{solicitacao.status}</strong>
                                        </span>

                                            {solicitacao.status === 'Aceito' && (
                                                <div className="mt-2">Entre em contato pelo número acima.</div>
                                            )}
                                        </div>

                                        {solicitacao.status === 'Aguardando' && (
                                            <div className="mt-4 flex space-x-2">
                                                <Button
                                                    className="bg-primary text-primary-foreground py-1 px-4 rounded flex items-center"
                                                    onClick={() => updateRequestStatus(solicitacao.id, 'Aceito')}>
                                                    <FontAwesomeIcon icon={faCheck} className="mr-2"/>
                                                    Aceitar
                                                </Button>
                                                <Button
                                                    className="bg-destructive text-destructive-foreground py-1 px-4 rounded flex items-center"
                                                    onClick={() => updateRequestStatus(solicitacao.id, 'Negado')}>
                                                    <FontAwesomeIcon icon={faTimes} className="mr-2"/>
                                                    Rejeitar
                                                </Button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-center mt-6 space-x-2">
                                {pageNumbers.map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`px-4 py-2 text-lg border rounded ${currentPage === number ? 'bg-primary text-primary-foreground' : ''}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {activeTab === 'dados' && (
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Alterar Dados Cadastrais</h2>
                    {loadingProfile ? (
                        <p>Carregando dados do perfil...</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name">Nome</label>
                                    <input id="name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} className="w-full border border-input p-2 rounded" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} type="email" className="w-full border border-input p-2 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="phone">Telefone</label>
                                    <input id="phone" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} type="tel" className="w-full border border-input p-2 rounded" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="capacity">Capacidade</label>
                                    <input id="capacity" value={profileData.capacity} onChange={(e) => setProfileData({ ...profileData, capacity: e.target.value })} type="number" className="w-full border border-input p-2 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="support_type">Tipo de Suporte</label>
                                    <select id="support_type" value={profileData.support_type} onChange={(e) => setProfileData({ ...profileData, support_type: e.target.value })} className="w-full border border-input p-2 rounded">
                                        <option value="Acomodação">Acomodação</option>
                                        <option value="Acomodação e alimentação">Acomodação e Alimentação</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="provider_description">Descrição</label>
                                <textarea id="provider_description" value={profileData.provider_description} onChange={(e) => setProfileData({ ...profileData, provider_description: e.target.value })} rows={3} className="w-full border border-input p-2 rounded"></textarea>
                            </div>

                            <Button type="submit" className="w-full bg-primary text-primary-foreground py-6 flex items-center justify-center">
                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
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
