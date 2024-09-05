"use client";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex items-center justify-center bg-background">
            <div className="w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm py-10 px-10 mt-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                className="borderless w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                            <input id="password" type="password" placeholder="Sua senha"
                                   className="borderless w-full"/>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded">
                        Salvar
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
