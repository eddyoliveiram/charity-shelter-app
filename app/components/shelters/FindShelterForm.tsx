"use client";
import { useState } from 'react';
import { setCookie } from 'cookies-next';
import axios from 'axios'; // Usa o axios padrão, sem a configuração do interceptor
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

export default function FindShelterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        groupSize: '',
        needType: '',
        description: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, needType: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Faz a requisição diretamente para a API sem usar o axiosConfig
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/seekers/create', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                group_size: formData.groupSize,
                need_type: formData.needType,
                seeker_description: formData.description,
                role: 'seeker', // Define o usuário como seeker
            });

            const { token, user } = response.data;

            // Armazenar o token JWT no cookie
            setCookie('token', token, {
                maxAge: 60 * 60 * 24, // 1 dia de validade
                path: '/',
                secure: true,
                httpOnly: false,
                sameSite: 'Strict',
            });

            // Armazenar as informações do usuário no cookie
            setCookie('user_info', JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }), {
                maxAge: 60 * 60 * 24,
                path: '/',
                secure: true,
                httpOnly: false,
                sameSite: 'Strict',
            });

            // Redirecionar conforme o papel (role) do usuário
            if (user.role === 'provider') {
                window.location.href = '/dashboard';
            } else if (user.role === 'seeker') {
                window.location.href = '/shelters/available';
            } else {
                window.location.href = '/';
            }

        } catch (error) {
            console.error('Erro ao encontrar abrigo e logar:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" value={formData.name} onChange={handleInputChange} placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email (opcional)</Label>
                    <Input id="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="seu@email.com" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Sua senha" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="group-size">Número de Pessoas</Label>
                    <Input id="groupSize" value={formData.groupSize} onChange={handleInputChange} type="number" placeholder="Número de pessoas no grupo" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="needType">Necessidade</Label>
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Acomodação">Acomodação</SelectItem>
                                <SelectItem value="Acomodação e alimentação">Acomodação e alimentação</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" value={formData.description} onChange={handleInputChange} rows={3} placeholder="Informações adicionais sobre sua situação" />
            </div>
            <Button type="submit" className="w-full py-6">Encontrar Abrigo</Button>
        </form>
    );
}
