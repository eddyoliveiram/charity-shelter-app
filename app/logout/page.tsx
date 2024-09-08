"use client";
import { setCookie } from 'cookies-next';
import { useEffect } from 'react';

export default function Logout() {
    useEffect(() => {
        setCookie('token', '', { maxAge: -1, path: '/' });
        setCookie('user_info', '', { maxAge: -1, path: '/' });
        window.location.href = '/login';
    }, []);

    return null;
}
