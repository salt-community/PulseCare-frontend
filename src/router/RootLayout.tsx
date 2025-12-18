import { Outlet } from "@tanstack/react-router";
import React from "react";

const RootLayout = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
