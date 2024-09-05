"use client";
import { useState } from "react";
import ShelterListWithPagination from "@/app/components/shelters/ShelterListWithPagination";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

export default function AvailableShelters() {
    const [activeTab, setActiveTab] = useState('shelters');

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">Olá, Fulano.</h1>
            <div className="relative mb-6">
                <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                        className={`text-xl py-6 px-4 ${activeTab === 'shelters' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                        onClick={() => setActiveTab('shelters')}
                    >
                        Abrigos
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

            {activeTab === 'shelters' && (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Abrigos Disponíveis</h1>
                    <p>Abaixo estão os abrigos temporários disponíveis para você.</p>
                    <ShelterListWithPagination/>
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
                                       className="w-full borderless"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder="seu@email.com"
                                       className="w-full borderless"/>
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
                                <label htmlFor="capacity">Número de Pessoas</label>
                                <input id="capacity" type="number" placeholder="Número de pessoas no grupo"
                                       className="w-full border border-input p-2 rounded"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="food">Necessidade</Label>
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

                        <Button type="submit" className="w-full bg-primary text-primary-foreground py-6">
                            Salvar
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}
