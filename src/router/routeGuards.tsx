import { redirect } from "@tanstack/react-router";

const decodeToken = (token: string) => {
	try {
		const parts = token.split(".");
		const decoded = JSON.parse(atob(parts[1]));
		return decoded;
	} catch (error) {
		console.error("Failed to decode token:", error);
		return null;
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adminRouteGuard = async ({ context }: any) => {
	const { auth } = context || {};

	if (!auth || !auth.getToken) {
		throw redirect({ to: "/" });
	}

	const tokenString = await auth.getToken();
	const token = decodeToken(tokenString);

	if (!token) {
		throw redirect({ to: "/" });
	}

	const role = token.role;

	if (role !== "admin") {
		throw redirect({ to: "/patient/dashboard" });
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patientRouteGuard = async ({ context }: any) => {
	const { auth } = context || {};

	if (!auth || !auth.getToken) {
		throw redirect({ to: "/" });
	}

	const tokenString = await auth.getToken();
	const token = decodeToken(tokenString);

	if (!token) {
		throw redirect({ to: "/" });
	}

	const role = token.role;

	if (role === "admin") {
		throw redirect({ to: "/admin/dashboard" });
	}
};
