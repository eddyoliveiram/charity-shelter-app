import ShelterList from '@/app/components/shelters/ShelterList';
import ShelterListWithPagination from "@/app/components/shelters/ShelterListWithPagination";

export default function AvailableShelters() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">Abrigos Disponíveis</h1>
            <p>Abaixo estão os abrigos temporários disponíveis para você.</p>
            <ShelterListWithPagination /> {/* Exibe os abrigos em forma de cartões */}
        </div>
    );
}
