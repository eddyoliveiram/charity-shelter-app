"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faClipboardList, faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function ShelterDashboard() {
    const [activeTab, setActiveTab] = useState('solicitacoes');

    const solicitacoes = [
        { nome: 'João da Silva', pessoas: 4, necessidade: 'Hospedagem e Alimentação' },
        { nome: 'Maria dos Santos', pessoas: 3, necessidade: 'Apenas Hospedagem' },
        { nome: 'Pedro Oliveira', pessoas: 2, necessidade: 'Hospedagem e Alimentação' },
        { nome: 'Ana Pereira', pessoas: 5, necessidade: 'Apenas Hospedagem' },
        { nome: 'Carlos Souza', pessoas: 6, necessidade: 'Hospedagem e Alimentação' },
        { nome: 'Lucia Dias', pessoas: 3, necessidade: 'Apenas Hospedagem' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const solicitacoesPerPage = 3;

    const indexOfLastSolicitacao = currentPage * solicitacoesPerPage;
    const indexOfFirstSolicitacao = indexOfLastSolicitacao - solicitacoesPerPage;
    const currentSolicitacoes = solicitacoes.slice(indexOfFirstSolicitacao, indexOfLastSolicitacao);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(solicitacoes.length / solicitacoesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Olá, Fulano.</h1>
                <a href="/" className="flex items-center text-lg py-2 px-4 bg-secondary text-secondary-foreground rounded-md">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
                </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-start items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
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
                    <p>Abaixo estão as solicitações feitas por pessoas que desejam se abrigar no local que você cadastrou.</p>
                    <ul className="mt-4 space-y-4">
                        {currentSolicitacoes.map((solicitacao, index) => (
                            <li key={index} className="border border-border p-4 bg-card text-card-foreground rounded-lg shadow-sm">
                                <div>
                                    <strong>Nome:</strong> {solicitacao.nome}
                                </div>
                                <div>
                                    <strong>Número de Pessoas:</strong> {solicitacao.pessoas}
                                </div>
                                <div>
                                    <strong>Necessidade:</strong> {solicitacao.necessidade}
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <Button className="bg-primary text-primary-foreground py-1 px-4 rounded flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                        Aceitar
                                    </Button>
                                    <Button className="bg-destructive text-destructive-foreground py-1 px-4 rounded flex items-center">
                                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                        Rejeitar
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center mt-6 space-x-2">
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-4 py-2 text-lg border rounded ${currentPage === number ? 'bg-primary text-primary-foreground' : ' '}`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'dados' && (
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Alterar Dados Cadastrais</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name">Nome</label>
                                <input id="name" placeholder="Seu nome" className="w-full border border-input p-2 rounded"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder="seu@email.com" className="w-full border border-input p-2 rounded"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="phone">Telefone</label>
                                <input id="phone" type="tel" placeholder="(00) 00000-0000" className="w-full border border-input p-2 rounded"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password">Senha</label>
                                <input id="password" type="password" placeholder="Sua senha" className="w-full border border-input p-2 rounded"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="capacity">Capacidade</label>
                                <input id="capacity" type="number" placeholder="Número máximo de pessoas" className="w-full border border-input p-2 rounded"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="food">Tipo de Suporte</Label>
                                <Select id="food">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="apenas-hospedagem">Apenas Hospedagem</SelectItem>
                                            <SelectItem value="hospedagem-alimentacao">Hospedagem e Alimentação</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description">Descrição</label>
                            <textarea id="description" rows={3} placeholder="Informações adicionais sobre seu abrigo" className="w-full border border-input p-2 rounded"></textarea>
                        </div>

                        <Button type="submit" className="w-full bg-primary text-primary-foreground py-6 flex items-center justify-center">
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            Salvar
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}

function handleSubmit(event) {
    event.preventDefault();
}
