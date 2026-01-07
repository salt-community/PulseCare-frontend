// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HealthStatsPage from "./HealthStatsPage";

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false
			}
		}
	});
	return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("HealthStatsPage", () => {
	beforeEach(() => {
		(import.meta as any).env = {
			...(import.meta as any).env,
			VITE_API_BASE_URL: "http://test.local"
		};

		vi.mock("@clerk/clerk-react", () => ({
			useAuth: () => ({
				getToken: vi.fn().mockResolvedValue("mock-token"),
				isLoaded: true,
				userId: "test-user-id"
			})
		}));
	});

	afterEach(() => {
		cleanup();
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
		vi.clearAllMocks();
	});

	it("shows Loading first and then 'No new results' when API returns empty array", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				json: vi.fn().mockResolvedValue({ value: [] })
			} as any)
		);

		render(<HealthStatsPage />, { wrapper: createWrapper() });

		expect(screen.getByText(/Loading health stats/i)).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText(/No new results/i)).toBeInTheDocument();
		});

		expect(screen.queryByText(/Loading health stats/i)).not.toBeInTheDocument();
	});

	it("shows 'No data could be loaded' when fetch rejects", async () => {
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

		render(<HealthStatsPage />, { wrapper: createWrapper() });

		await waitFor(() => {
			expect(screen.getByText(/No data could be loaded/i)).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.queryByText(/Loading health stats/i)).not.toBeInTheDocument();
		});

		expect(screen.queryByText(/No new results/i)).not.toBeInTheDocument();
	});
});
