export type PackageManager = "npm" | "pnpm";

export type ProjectType = "frontend-only" | "backend-only" | "full-stack";

export type FrontendType = "react" | "nextjs";

export type BackendType = "nestjs" | "expressjs";

export type FrontendStyling = "tailwind-css" | "none";

export type FrontendComponentLibrary = "mantine" | "material-ui" | "none";

export type FrontendHttpClient = "axios" | "ky" | "native-fetch";

export interface ProjectConfig {
	projectName: string;
	packageManager: PackageManager;
	projectType: ProjectType;

	frontendType: FrontendType | null;
	backendType: BackendType | null;

	frontendStyleChoice: FrontendStyling | null;
	frontendComponentLibrary: FrontendComponentLibrary | null;
	frontendHttpClient: FrontendHttpClient | null;

	frontendPages: string[];
	frontendFeatures: string[];
}
