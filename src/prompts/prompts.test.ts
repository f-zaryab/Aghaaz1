import { input, select } from "@inquirer/prompts";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { askBackendChoices } from "./backend.js";
import { askFrontendChoices } from "./frontend.js";
import { askPackageManager } from "./packageManager.js";
import { askProjectName } from "./projectName.js";
import { askProjectType } from "./projectType.js";

vi.mock("@inquirer/prompts", () => ({
	input: vi.fn(),
	select: vi.fn(),
}));

const mockedInput = vi.mocked(input);
const mockedSelect = vi.mocked(select);

describe("prompt functions", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("askProjectName", () => {
		it("returns the project name returned by the input prompt", async () => {
			mockedInput.mockResolvedValue("my-project");

			const result = await askProjectName();

			expect(result).toBe("my-project");
		});

		it("configures the expected project-name message", async () => {
			mockedInput.mockResolvedValue("my-project");

			await askProjectName();

			expect(mockedInput).toHaveBeenCalledOnce();
			expect(mockedInput).toHaveBeenCalledWith(
				expect.objectContaining({
					message: "Project name?",
				}),
			);
		});

		it("rejects an empty project name", async () => {
			mockedInput.mockResolvedValue("my-project");

			await askProjectName();

			const options = mockedInput.mock.calls[0]?.[0];
			const validate = options?.validate;

			expect(validate).toBeDefined();
			expect(await validate?.("")).toBe("Project name is required.");
			expect(await validate?.("   ")).toBe("Project name is required.");
		});

		it.each([
			"MyProject",
			"my project",
			"my.project",
			"_my-project",
			"-my-project",
			"my@project",
		])("rejects invalid project name: %s", async (projectName) => {
			mockedInput.mockResolvedValue("my-project");

			await askProjectName();

			const options = mockedInput.mock.calls[0]?.[0];
			const validate = options?.validate;

			expect(await validate?.(projectName)).toBe(
				"Use lowercase letters, numbers, hyphens, or underscores.",
			);
		});

		it.each([
			"my-project",
			"my_project",
			"project1",
			"1project",
			"project",
			"my-project-2",
		])("accepts valid project name: %s", async (projectName) => {
			mockedInput.mockResolvedValue("my-project");

			await askProjectName();

			const options = mockedInput.mock.calls[0]?.[0];
			const validate = options?.validate;

			expect(await validate?.(projectName)).toBe(true);
		});

		it("trims whitespace before validating the project name", async () => {
			mockedInput.mockResolvedValue("my-project");

			await askProjectName();

			const options = mockedInput.mock.calls[0]?.[0];
			const validate = options?.validate;

			expect(await validate?.("  my-project  ")).toBe(true);
		});

		it("configures a transformer that trims the displayed value", async () => {
			mockedInput.mockResolvedValue("my-project");

			await askProjectName();

			const options = mockedInput.mock.calls[0]?.[0];
			const transformer = options?.transformer;

			expect(transformer).toBeDefined();
			expect(transformer?.("  my-project  ", { isFinal: false })).toBe(
				"my-project",
			);
		});
	});

	describe("askPackageManager", () => {
		it.each(["npm", "pnpm"] as const)(
			"returns the selected package manager: %s",
			async (packageManager) => {
				mockedSelect.mockResolvedValue(packageManager);

				const result = await askPackageManager();

				expect(result).toBe(packageManager);
			},
		);

		it("configures the package-manager prompt", async () => {
			mockedSelect.mockResolvedValue("npm");

			await askPackageManager();

			expect(mockedSelect).toHaveBeenCalledOnce();
			expect(mockedSelect).toHaveBeenCalledWith({
				message: "Which package manager?",
				choices: [
					{ name: "npm", value: "npm" },
					{ name: "pnpm", value: "pnpm" },
				],
			});
		});
	});

	describe("askProjectType", () => {
		it.each(["frontend-only", "backend-only", "full-stack"] as const)(
			"returns the selected project type: %s",
			async (projectType) => {
				mockedSelect.mockResolvedValue(projectType);

				const result = await askProjectType();

				expect(result).toBe(projectType);
			},
		);

		it("configures the project-type prompt", async () => {
			mockedSelect.mockResolvedValue("frontend-only");

			await askProjectType();

			expect(mockedSelect).toHaveBeenCalledOnce();
			expect(mockedSelect).toHaveBeenCalledWith({
				message: "Project type?",
				choices: [
					{
						name: "frontend only",
						value: "frontend-only",
					},
					{
						name: "backend only",
						value: "backend-only",
					},
					{
						name: "full stack",
						value: "full-stack",
					},
				],
			});
		});
	});

	describe("askFrontendChoices", () => {
		it.each(["react", "nextjs"] as const)(
			"returns the selected frontend type: %s",
			async (frontendType) => {
				mockedSelect.mockResolvedValue(frontendType);

				const result = await askFrontendChoices();

				expect(result).toBe(frontendType);
			},
		);

		it("configures the frontend prompt", async () => {
			mockedSelect.mockResolvedValue("react");

			await askFrontendChoices();

			expect(mockedSelect).toHaveBeenCalledOnce();
			expect(mockedSelect).toHaveBeenCalledWith({
				message: "Choose for frontend",
				choices: [
					{ name: "react", value: "react" },
					{ name: "nextjs", value: "nextjs" },
				],
			});
		});
	});

	describe("askBackendChoices", () => {
		it.each(["nestjs", "expressjs"] as const)(
			"returns the selected backend type: %s",
			async (backendType) => {
				mockedSelect.mockResolvedValue(backendType);

				const result = await askBackendChoices();

				expect(result).toBe(backendType);
			},
		);

		it("configures the backend prompt", async () => {
			mockedSelect.mockResolvedValue("nestjs");

			await askBackendChoices();

			expect(mockedSelect).toHaveBeenCalledOnce();
			expect(mockedSelect).toHaveBeenCalledWith({
				message: "Choose for backend",
				choices: [
					{ name: "nestjs", value: "nestjs" },
					{ name: "express", value: "expressjs" },
				],
			});
		});
	});
});
