export default function ShelterDashboard() {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">Solicitações para o seu Abrigo</h1>
            <p>Abaixo estão as solicitações feitas por pessoas que desejam se abrigar no local que você cadastrou.</p>

            <ul className="mt-4">
                {/* Simulação de solicitação para o abrigo */}
                <li className="border p-4 mb-2">
                    <div>
                        <strong>Nome:</strong> João da Silva
                    </div>
                    <div>
                        <strong>Número de Pessoas:</strong> 4
                    </div>
                    <div>
                        <strong>Necessidade:</strong> Hospedagem e Alimentação
                    </div>
                    <div>
                        <button className="bg-green-500 text-white py-1 px-4 mr-2 rounded">
                            Aceitar
                        </button>
                        <button className="bg-red-500 text-white py-1 px-4 rounded">
                            Rejeitar
                        </button>
                    </div>
                </li>

                <li className="border p-4 mb-2">
                    <div>
                        <strong>Nome:</strong> Maria dos Santos
                    </div>
                    <div>
                        <strong>Número de Pessoas:</strong> 3
                    </div>
                    <div>
                        <strong>Necessidade:</strong> Apenas Hospedagem
                    </div>
                    <div>
                        <button className="bg-green-500 text-white py-1 px-4 mr-2 rounded">
                            Aceitar
                        </button>
                        <button className="bg-red-500 text-white py-1 px-4 rounded">
                            Rejeitar
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
}
