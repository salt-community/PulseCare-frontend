import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/ui/Sidebar";
import React from "react";

const RootLayout = () => {
	return (
		<>
			<main>
				<Sidebar />
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
