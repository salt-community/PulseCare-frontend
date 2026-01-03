// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import HealthStatsPage from "./HealthStatsPage";

describe("HealthStatsPage", () => {
	beforeEach(() => {
		(import.meta as any).env = {
			...(import.meta as any).env,
			VITE_API_BASE_URL: "http://test.local"
		};
	});

	afterEach(() => {
		cleanup();
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it("shows Loading first and then 'No new results' when API returns empty array", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: vi.fn().mockResolvedValue([])
			} as any)
		);

		render(<HealthStatsPage />);

		expect(screen.getByText(/Loading health stats/i)).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText(/No new results/i)).toBeInTheDocument();
		});

		expect(screen.queryByText(/Loading health stats/i)).not.toBeInTheDocument();
	});

	it("shows 'No data could be loaded' when fetch rejects", async () => {
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

		render(<HealthStatsPage />);

		await waitFor(() => {
			expect(screen.getByText(/No data could be loaded/i)).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(screen.queryByText(/Loading health stats/i)).not.toBeInTheDocument();
		});

		expect(screen.queryByText(/No new results/i)).not.toBeInTheDocument();
	});
});
