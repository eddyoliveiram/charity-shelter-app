import Image from 'next/image';

export default function Header() {
    return (
        <div>
            <header className="bg-primary text-primary-foreground">
                <Image
                    src="/img.webp"
                    alt="Paisagem do Rio Grande do Sul"
                    width={1200} // Defina as dimensões adequadas
                    height={200} // para a imagem
                    className="w-full h-28 object-cover"
                    priority={true} // Carregar a imagem com prioridade para otimizar LCP
                />
                <h1 className="text-base font-bold text-center py-4">
                    Portal Abrigo de Inverno - RS/2024
                </h1>
            </header>
        </div>
    );
}
