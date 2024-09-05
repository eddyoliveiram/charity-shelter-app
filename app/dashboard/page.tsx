"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {Label} from "@/app/components/ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/app/components/ui/select";

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
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">Olá, Fulano.</h1>

            <div className="relative mb-6">
                <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                        className={`text-xl py-6 px-4 ${activeTab === 'solicitacoes' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                        onClick={() => setActiveTab('solicitacoes')}
                    >
                        Solicitações
                    </button>
                    <button
                        className={`text-xl py-6 px-4 ${activeTab === 'dados' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                        onClick={() => setActiveTab('dados')}
                    >
                        Alterar Dados Cadastrais
                    </button>
                </div>

                <div className="absolute top-0 right-0 mt-6 mr-6">
                    <a href="/" className="text-xl py-6 px-4 bg-secondary text-secondary-foreground">
                        Logout
                    </a>
                </div>
            </div>

            {activeTab === 'solicitacoes' && (
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Solicitações para o seu Abrigo</h2>
                    <p>Abaixo estão as solicitações feitas por pessoas que desejam se abrigar no local que você
                        cadastrou.</p>
                    <ul className="mt-4">
                        {currentSolicitacoes.map((solicitacao, index) => (
                            <li key={index} className="border border-border p-4 mb-2 bg-card text-card-foreground">
                                <div>
                                    <strong>Nome:</strong> {solicitacao.nome}
                                </div>
                                <div>
                                    <strong>Número de Pessoas:</strong> {solicitacao.pessoas}
                                </div>
                                <div>
                                    <strong>Necessidade:</strong> {solicitacao.necessidade}
                                </div>
                                <div className="mt-4">
                                    <Button className="bg-primary text-primary-foreground py-1 px-4 mr-2 rounded">
                                        Aceitar
                                    </Button>
                                    <Button className="bg-destructive text-destructive-foreground py-1 px-4 rounded">
                                        Rejeitar
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>

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
            )}

            {activeTab === 'dados' && (
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Alterar Dados Cadastrais</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name">Nome</label>
                                <input id="name" placeholder="Seu nome"
                                       className="w-full border border-input p-2 rounded"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder="seu@email.com"
                                       className="w-full border border-input p-2 rounded"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="phone">Telefone</label>
                                <input id="phone" type="tel" placeholder="(00) 00000-0000"
                                       className="w-full border border-input p-2 rounded"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password">Senha</label>
                                <input id="password" type="password" placeholder="Sua senha"
                                       className="w-full border border-input p-2 rounded"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="capacity">Capacidade</label>
                                <input id="capacity" type="number" placeholder="Número máximo de pessoas"
                                       className="w-full border border-input p-2 rounded"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="food">Tipo de Suporte</Label>
                                <Select id="food">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="apenas-hospedagem">Apenas Hospedagem</SelectItem>
                                            <SelectItem value="hospedagem-alimentacao">Hospedagem e
                                                Alimentação</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description">Descrição</label>
                            <textarea id="description" rows={3} placeholder="Informações adicionais sobre seu abrigo"
                                      className="w-full border border-input p-2 rounded"></textarea>
                        </div>

                        <Button type="submit" className="w-full bg-primary text-primary-foreground">
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
