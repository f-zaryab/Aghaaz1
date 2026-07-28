import type { PackageManager } from "../../types/project-config.types.js";

export type PackageCommand = {
	command: string;
	args: string[];
};

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
