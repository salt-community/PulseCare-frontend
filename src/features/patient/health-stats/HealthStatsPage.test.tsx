// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import HealthStatsPage from "./HealthStatsPage";

describe("HealthStatsPage", () => {
	beforeEach(() => {
		(import.meta as any).env = {
			...(import.meta as any).env,
			VITE_API_BASE_URL: "http://test.local"
		};

		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				json: vi.fn().mockResolvedValue([])
			} as any)
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it("shows Loading first and then 'No new results' when API returns empty array", async () => {
		render(<HealthStatsPage />);

		expect(screen.getByText(/Loading health stats/i)).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText(/No new results/i)).toBeInTheDocument();
		});

		expect(screen.queryByText(/Loading health stats/i)).not.toBeInTheDocument();
	});
});
