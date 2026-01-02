const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const syncUser = async (accessToken: string): Promise<void> => {
	const url = `${baseUrl}/users/sync`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (!response.ok) {
		throw new Error("User sync failed");
	}
};
