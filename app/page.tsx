"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProvideShelterForm from '@/app/components/shelters/ProvideShelterForm';
import FindShelterForm from '@/app/components/shelters/FindShelterForm';
import ShelterList from '@/app/components/shelters/ShelterList';
import ShelterHeader from '@/app/components/shelters/ShelterHeader';
import { Separator } from '@/app/components/ui/Separator';
import HomeIcon from "@/app/components/icons/HomeIcon";
import SearchIcon from "@/app/components/icons/SearchIcon";
import {Button} from "@/app/components/ui/Button";

export default function HomePage() {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/providers/random');
                setProviders(response.data);
            } catch (error) {
                setError('Erro ao buscar dados');
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="flex items-center space-x-4 mt-6">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4531/4531744.png"
                        alt="Descrição da Imagem"
                        className="image-height"
                    />
                    <div className="custom-text text-center italic">
                        Dezenas de milhares de vítimas da enchente no RS passarão frio neste inverno de 2024. <br/>
                        Se você não puder doar, considere abrir as portas de sua casa e oferecer abrigo para essas
                        pessoas.
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl mx-auto py-4 md:py-4 ">
                <div className="flex justify-center ">
                    <Button
                        type="button"
                        className="py-6 mb-6 w-full md:w-auto"
                        onClick={() => window.location.href = '/login'}
                    >
                        Já tem uma conta? Clique aqui.
                    </Button>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm py-10 px-10">
                        <ShelterHeader
                            title="Fornecer Abrigo"
                            subtitle="Ofereça abrigo temporário para vítimas de enchentes."
                            icon={<HomeIcon size={50} className="w-8 h-8 text-primary"/>}
                        />
                        <ProvideShelterForm/>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm py-10 px-10">
                        <ShelterHeader
                            title="Encontrar Abrigo"
                            subtitle="Encontre abrigo temporário após as enchentes."
                            icon={<SearchIcon className="w-8 h-8 text-primary"/>}
                        />
                        <FindShelterForm/>
                    </div>
                </div>

                <Separator className="my-12"/>

                <div className="space-y-6 mb-10">
                    <ShelterHeader
                        title="Abrigos Disponíveis"
                        subtitle="Veja alguns dos abrigos temporários disponíveis."
                        icon={null}
                    />
                    <ShelterList providers={providers} />
                </div>
            </div>
        </div>
    );
}
