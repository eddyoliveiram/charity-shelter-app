"use client";
import { useState } from 'react';
import api from '@/app/utils/axiosConfig';
import { setCookie } from 'cookies-next';
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import Swal from 'sweetalert2'; // Importando SweetAlert2
import { AxiosError } from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            // Faz a requisição de login para a API
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            // A API retorna um token JWT e informações do usuário
            const { token, user } = response.data;

            // Armazena o token JWT no cookie (apenas no lado do cliente)
            setCookie('token', token, {
                maxAge: 60 * 60 * 24, // 1 dia de validade
                path: '/',
                secure: true, // Garante que o cookie só seja enviado em conexões HTTPS
                httpOnly: false, // O cookie será acessível no lado do cliente
                sameSite: 'strict', // Protege contra CSRF
            });

            // Armazena as informações do usuário (nome, email e role) em outro cookie
            setCookie('user_info', JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role, // Armazena a role do usuário
            }), {
                maxAge: 60 * 60 * 24, // 1 dia de validade
                path: '/',
                secure: true,
                httpOnly: false, // O cookie será acessível no lado do cliente
                sameSite: 'strict',
            });

            // Exibe o SweetAlert de sucesso
            Swal.fire({
                icon: 'success',
                title: 'Login bem-sucedido!',
                text: 'Redirecionando...',
                showConfirmButton: false,
                timer: 2000
            });

            // Redirecionamento baseado no papel do usuário
            setTimeout(() => {
                if (user.role === 'provider') {
                    window.location.href = '/dashboard';
                } else if (user.role === 'seeker') {
                    window.location.href = '/shelters/available';
                } else {
                    window.location.href = '/';
                }
            }, 2000);
        } catch (error) {
            if (error instanceof AxiosError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no login',
                    text: error.response?.data?.message || 'Falha no login',
                });
                setError(error.response?.data?.message || 'Falha no login');
            } else {
                // Caso o erro não seja do tipo AxiosError
                Swal.fire({
                    icon: 'error',
                    title: 'Erro desconhecido',
                    text: 'Ocorreu um erro inesperado',
                });
                setError('Ocorreu um erro inesperado');
            }
        }
    };

    return (
        <div className="flex items-center justify-center bg-background">
            <div className="w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm py-10 px-10 mt-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="borderless w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="borderless w-full"
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded">
                        Entrar
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Não possui conta?{' '}
                        <Link href="/" className="text-blue-500 hover:underline">
                            Clique aqui
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
