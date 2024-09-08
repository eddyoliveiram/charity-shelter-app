import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Obtém as informações do usuário diretamente do cookie
    const userInfo = request.cookies.get('user_info')?.value;
    const publicRoutes = ['/', '/login']; // Rotas públicas

    if (userInfo) {
        try {
            const user = JSON.parse(userInfo); // Decodifica o JSON do cookie
            const userRole = user.role; // Obtém a role do usuário

            // Redireciona com base na role do usuário
            if (publicRoutes.includes(request.nextUrl.pathname)) {
                if (userRole === 'provider') {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                } else if (userRole === 'seeker') {
                    return NextResponse.redirect(new URL('/shelters/available', request.url));
                }
            }

            // Se o usuário estiver logado e não estiver tentando acessar uma rota pública, permitir o acesso
            return NextResponse.next();
        } catch (error) {
            console.error('Erro ao manipular o cookie user_info:', error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else {
        // Se o usuário não estiver logado, redirecionar para login se estiver tentando acessar uma rota protegida
        if (!publicRoutes.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Permitir o acesso às rotas públicas
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/', '/login', '/dashboard/:path*', '/shelters/:path*'],
};
