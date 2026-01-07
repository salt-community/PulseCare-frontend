import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { fetchDoctors } from "../lib/api/doctorApi";
import type { Doctor } from "../lib/types/doctor";

export function useDoctors() {
    const { getToken, isLoaded } = useAuth();

    return useQuery<Doctor[]>({
        queryKey: ["doctors"],
        queryFn: async () => {
            const safeGetToken = async (): Promise<string> => {
                const token = await getToken();
                if (!token) throw new Error("Auth not found");
                return token;
            };

            return fetchDoctors(safeGetToken);
        },
        enabled: isLoaded,
        staleTime: 1000 * 60 * 5,
    });
}