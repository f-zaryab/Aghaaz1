import type { PackageManager } from "../../../../../../types/project-config.types.js";

export type PackageCommand = {
	command: string;
	args: string[];
};

// FRONTEND: NEXT.JS -------------------------------------------------//
export const getCreateNextAppCommand = (
	pkgManager: PackageManager,
): PackageCommand => {
	switch (pkgManager) {
		case "npm":
			return {
				command: "npx",
				args: ["--yes", "create-next-app@latest"],
			};

		case "pnpm":
			return {
				command: "pnpm",
				args: ["dlx", "create-next-app@latest"],
			};

		default: {
			const exhaustiveCheck: never = pkgManager;
			throw new Error(`Unsupported package manager: ${exhaustiveCheck}`);
		}
	}
};

// FRONTEND: REACT.JS ------------------------------------------------//
export const getCreateReactAppCommand = (
	pkgManager: PackageManager,
): PackageCommand => {
	switch (pkgManager) {
		case "npm":
			return {
				command: "npx",
				args: ["--yes", "create-vite@latest"],
			};

		case "pnpm":
			return {
				command: "pnpm",
				args: ["create", "vite@latest"],
			};

		default: {
			const exhaustiveCheck: never = pkgManager;
			throw new Error(`Unsupported package manager: ${exhaustiveCheck}`);
		}
	}
};
