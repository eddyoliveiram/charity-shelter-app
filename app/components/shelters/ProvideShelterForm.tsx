"use client";
import { useState } from 'react';
import { setCookie } from 'cookies-next';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

export default function ProvideShelterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        capacity: '',
        supportType: '',
        description: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, supportType: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação básica para campos em branco
        if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.capacity || !formData.supportType || !formData.description) {
            return Swal.fire({
                title: 'Erro!',
                text: 'Por favor, preencha todos os campos!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/providers/create', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                capacity: formData.capacity,
                support_type: formData.supportType,
                provider_description: formData.description,
                role: 'provider',
            });

            const { token, user } = response.data;

            setCookie('token', token, {
                maxAge: 60 * 60 * 24,
                path: '/',
                secure: true,
                httpOnly: false,
                sameSite: 'strict',
            });

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
                sameSite: 'strict',
            });

            Swal.fire({
                title: 'Sucesso!',
                text: 'Abrigo fornecido com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                if (user.role === 'provider') {
                    window.location.href = '/dashboard';
                } else if (user.role === 'seeker') {
                    window.location.href = '/shelters/available';
                } else {
                    window.location.href = '/';
                }
            });

        } catch (error) {
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao fornecer abrigo. Tente novamente mais tarde.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Erro ao fornecer abrigo:', error);
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
                    <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="capacity">Capacidade</Label>
                    <Input id="capacity" value={formData.capacity} onChange={handleInputChange} type="number" placeholder="Número máximo de pessoas" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="supportType">Tipo de Suporte</Label>
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
                <Textarea id="description" value={formData.description} onChange={handleInputChange} rows={3} placeholder="Informações adicionais sobre seu abrigo" />
            </div>
            <Button type="submit" className="w-full py-6">Fornecer Abrigo</Button>
        </form>
    );
}
