import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react';
import { Navigate, Outlet, redirect } from 'react-router-dom';

const AuthGuard = ({ children, isLogin = false }: { children: React.ReactNode, isLogin: boolean }) => {
    const { walletAddress } = useContext(AppContext);
    
    if (isLogin) {
        if (walletAddress) redirect("/wallet");
    }
    if(!walletAddress) redirect("/login");
    return children;
}

export default AuthGuard