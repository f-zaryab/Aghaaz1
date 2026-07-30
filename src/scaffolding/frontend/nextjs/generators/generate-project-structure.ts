import { mkdir } from "node:fs/promises";
import path from "node:path";

const PROJECT_DIRECTORIES = [
	"src/features",
	"src/shared/components",
	"src/shared/hooks",
	"src/shared/lib",
	"src/shared/types",
	"src/shared/utils",
] as const;

const generateProjectStructure = async (targetDir: string): Promise<void> => {
	for (const directory of PROJECT_DIRECTORIES) {
		const directoryPath = path.join(targetDir, directory);

		await mkdir(directoryPath, {
			recursive: true,
		});
	}
};

export default generateProjectStructure;

/* 
Generate-Project-Structure

src/
├── app/
├── features/
└── shared/
    ├── components/
    ├── hooks/
    ├── lib/
    ├── types/
    └── utils/
*/
