import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
    const [user, setUser] = useState<null | { name: string, email: string, email_verified_at: string | null }>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const http = axios.create({
        baseURL: 'http://localhost:80',
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        withXSRFToken: true,
    });

    useEffect(() => {
        http.get("/api/user")
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return { isAuthenticated: !!user, isVerified: !!user?.email_verified_at, loading };
}