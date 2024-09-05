import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

export default function FindShelterForm() {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = '/shelters/available';
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email (opcional)</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" placeholder="Sua senha" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="group-size">Número de Pessoas</Label>
                    <Input id="group-size" type="number" placeholder="Número de pessoas no grupo" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="food">Necessidade</Label>
                    <Select id="food">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apenas-hospedagem">Apenas Hospedagem</SelectItem>
                                <SelectItem value="hospedagem-alimentacao">Hospedagem e Alimentação</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" rows={3} placeholder="Informações adicionais sobre sua situação" />
            </div>
            <Button type="submit" className="w-full py-6">Encontrar Abrigo</Button>
        </form>
    );
}
