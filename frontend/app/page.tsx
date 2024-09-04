import ProvideShelterForm from '@/app/components/shelters/ProvideShelterForm';
import FindShelterForm from '@/app/components/shelters/FindShelterForm';
import ShelterList from '@/app/components/shelters/ShelterList';
import ShelterHeader from '@/app/components/shelters/ShelterHeader';
import { Separator } from '@/app/components/ui/Separator';
import HomeIcon from "@/app/components/icons/HomeIcon";
import SearchIcon from "@/app/components/icons/SearchIcon";
import './globals.css';


export default function HomePage() {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                    <ShelterHeader
                        title="Fornecer Abrigo"
                        subtitle="Ofereça abrigo temporário para vítimas de enchentes."
                        icon={<HomeIcon size={50} className="w-8 h-8 text-primary" />} // Ícone de casa
                    />
                    <ProvideShelterForm />
                </div>
                <div>
                    <ShelterHeader
                        title="Encontrar Abrigo"
                        subtitle="Encontre abrigo temporário após as enchentes."
                        icon={<SearchIcon className="w-8 h-8 text-primary" />} // Ícone de pesquisa
                    />
                    <FindShelterForm />
                </div>
            </div>
            <Separator className="my-12" />
            <div className="space-y-6">
                <ShelterHeader
                    title="Abrigos Disponíveis"
                    subtitle="Veja os abrigos temporários disponíveis."
                    icon={null}/>
                <ShelterList />
            </div>
        </div>
    );
}
