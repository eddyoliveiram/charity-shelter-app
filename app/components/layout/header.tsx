export default function Header() {
    return (
        <div>
            <header className="bg-primary text-primary-foreground">
                <img
                    src="/img.webp"
                    alt="Paisagem do Rio Grande do Sul"
                    className="w-full h-28 object-cover"
                />
                <h1 className="text-base font-bold text-center py-4 ">Portal Abrigo de Inverno - RS/2024</h1>
                {/*<div className="container mx-auto flex justify-between items-center">*/}
                {/*    <h1 className="text-2xl font-bold">Portal Abrigo de Inverno - Rio Grande do Sul</h1>*/}
                {/*    /!*<p className="text-sm font-bold">Conectando vítimas de enchentes a abrigos temporários durante o inverno.</p>*!/*/}
                {/*</div>*/}
            </header>

        </div>
    );
}

