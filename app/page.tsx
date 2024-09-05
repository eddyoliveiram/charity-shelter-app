"use client";
import ProvideShelterForm from '@/app/components/shelters/ProvideShelterForm';
import FindShelterForm from '@/app/components/shelters/FindShelterForm';
import ShelterList from '@/app/components/shelters/ShelterList';
import ShelterHeader from '@/app/components/shelters/ShelterHeader';
import { Separator } from '@/app/components/ui/Separator';
import HomeIcon from "@/app/components/icons/HomeIcon";
import SearchIcon from "@/app/components/icons/SearchIcon";
export default function HomePage() {

    return (
        <div>
            {/*<div className="mt-8 text-center text-2xl">*/}
            {/*    <p>Já tem uma conta?*/}
            {/*        <button className="mx-1 text-blue-900 text-2xl">*/}
            {/*            Clique aqui.*/}
            {/*        </button>*/}
            {/*    </p>*/}
            {/*</div>*/}
            <div className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                        <ShelterHeader
                            title="Fornecer Abrigo"
                            subtitle="Ofereça abrigo temporário para vítimas de enchentes."
                            icon={<HomeIcon size={50} className="w-8 h-8 text-primary"/>}
                        />
                        <ProvideShelterForm/>
                    </div>
                    <div>
                        <ShelterHeader
                            title="Encontrar Abrigo"
                            subtitle="Encontre abrigo temporário após as enchentes."
                            icon={<SearchIcon className="w-8 h-8 text-primary"/>}
                        />
                        <FindShelterForm/>
                    </div>
                </div>

                <Separator className="my-12"/>

                <div className="space-y-6">
                    <ShelterHeader
                        title="Abrigos Disponíveis"
                        subtitle="Veja alguns dos abrigos temporários disponíveis."
                        icon={null}
                    />
                    <ShelterList/>
                </div>
            </div>
        </div>
    );
}
