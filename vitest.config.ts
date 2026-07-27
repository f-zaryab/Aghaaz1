import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		globals: true,
		include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
		exclude: [
			"dist/**",
			"coverage/**",
			"node_modules/**",
			"templates/**",
			"fixtures/**",
		],
		clearMocks: true,
		restoreMocks: true,
		mockReset: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "json"],
			include: ["src/**/*.ts"],
			exclude: ["src/index.ts", "**/*.d.ts"],
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 75,
				statements: 80,
			},
		},
	},
});
