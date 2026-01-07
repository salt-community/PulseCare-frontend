import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { patientApi } from "../lib/api/patientApi";

export const usePatients = () => {
	const { getToken } = useAuth();

	return useQuery({
		queryKey: ["patients"],
		queryFn: async () => {
			const token = await getToken();
			if (!token) throw new Error("No authentication token");
			return patientApi.getAllPatients(token);
		}
	});
};
