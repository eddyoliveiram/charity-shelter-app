export default function Header() {
    return (
        <div>
            <header className="bg-primary text-primary-foreground py-4 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Portal Abrigo - Rio Grande do Sul</h1>
                    <p className="text-sm">Conectando vítimas de enchentes a abrigos temporários durante o inverno.</p>
                </div>
            </header>
            <img
                src="/img.webp"
                alt="Paisagem do Rio Grande do Sul"
                className="w-full h-28 object-cover"
            />
        </div>
    );
}

