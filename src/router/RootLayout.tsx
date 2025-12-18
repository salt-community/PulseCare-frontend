import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/ui/Sidebar";
import React from "react";
import { Header } from "../components/shared/Header";

const RootLayout = () => {
	return (
		<>
			<div className="h-screen w-screen flex flex-col ">
				<header className="h-14 shrink-0 border-b">
					<Header />
				</header>
				<div className="flex flex-1 overflow-hidden">
					<aside className="shrink-0">
						<Sidebar />
					</aside>
					<main className="flex-1 overflow-y-auto p-6">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};

export default RootLayout;
