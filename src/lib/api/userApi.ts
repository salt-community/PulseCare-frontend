const baseUrl = import.meta.env.VITE_API_BASE_URL;

type UserInfo = {
	name?: string;
	email?: string;
};

export const syncUser = async (accessToken: string, userInfo: UserInfo): Promise<void> => {
	const url = `${baseUrl}/users/sync`;

	console.log(accessToken);
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userInfo)
	});
	console.log("apiResponse: ", response);

	if (!response.ok) {
		throw new Error("User sync failed");
	}
};
