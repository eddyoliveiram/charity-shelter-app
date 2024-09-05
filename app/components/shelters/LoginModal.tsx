import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import Link from "next/link";

export function LoginModal({ onClose }: { onClose: () => void }) {
  return (
      <div className="flex justify-center items-center h-screen">
        <Card className="relative w-full max-w-md">
          {/* Botão para fechar o modal */}
          <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            X
          </button>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Entre com seu email e senha para acessar sua conta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="#" className="text-sm underline" prefetch={false}>
                  Esqueceu a senha?
                </Link>
              </div>
              <Input id="password" type="password" required placeholder="senha" />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </CardContent>
        </Card>
      </div>
  );
}
