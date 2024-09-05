import ShelterList from '@/app/components/shelters/ShelterList';
import ShelterListWithPagination from "@/app/components/shelters/ShelterListWithPagination";

export default function AvailableShelters() {
    return (
        <div className="container mx-auto py-12">

            <div className="relative mb-10">
                <div className="">
                    <h1 className="text-3xl font-bold ">Abrigos Disponíveis</h1>
                    <p>Abaixo estão os abrigos temporários disponíveis para você.</p>
                </div>

                <div className="absolute bottom-0 right-0">
                    <a href="/" className="text-xl py-6 px-4 bg-secondary text-secondary-foreground">
                        Logout
                    </a>
                </div>
            </div>
            <ShelterListWithPagination/>
        </div>
    );
}
