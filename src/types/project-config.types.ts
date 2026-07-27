export type PackageManager = "npm" | "pnpm";

export type ProjectType = "frontend-only" | "backend-only" | "full-stack";

export type FrontendType = "react" | "nextjs";

export type BackendType = "nestjs" | "expressjs";

export interface ProjectConfig {
	projectName: string;
	packageManager: PackageManager;
	projectType: ProjectType;
	frontendType: FrontendType | null;
	backendType: BackendType | null;
}
