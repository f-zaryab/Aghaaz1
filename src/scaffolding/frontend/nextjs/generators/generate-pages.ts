import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
	assertPathInsideAppDirectory,
	pathExists,
} from "../../../shared/utils/index.js";
import { createPageTemplate } from "./page-template.js";

type GenerateSinglePageOptions = {
	appDir: string;
	route: string;
};

type GeneratePagesOptions = {
	targetDir: string;
	pages: string[];
};

const generateSinglePage = async ({
	appDir,
	route,
}: GenerateSinglePageOptions): Promise<void> => {
	const pageDir = path.resolve(appDir, route);

	assertPathInsideAppDirectory({
		appDir,
		targetPath: pageDir,
	});

	await mkdir(pageDir, {
		recursive: true,
	});

	const pageFilePath = path.join(pageDir, "page.tsx");

	if (await pathExists(pageFilePath)) {
		throw new Error(`Page already exists for route "/${route}".`);
	}

	const pageContent = createPageTemplate(route);

	await writeFile(pageFilePath, pageContent, "utf8");
};

const generatePages = async ({
	pages,
	targetDir,
}: GeneratePagesOptions): Promise<void> => {
	const appDir = path.resolve(targetDir, "src", "app");

	// Generating pages
	for (const route of pages) {
		await generateSinglePage({
			appDir,
			route,
		});
	}
};

export default generatePages;

/* 
given 
frontendPages: [
  "about",
  "contact",
  "dashboard/settings",
]

it creates:

src/app/
├── page.tsx
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
└── dashboard/
    └── settings/
        └── page.tsx

*/
