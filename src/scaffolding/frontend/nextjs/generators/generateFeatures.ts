import { mkdir } from "node:fs/promises";
import path from "node:path";
import { assertPathInsideDirectory } from "../../../shared/utils/index.js";

type GenerateFeatures = {
	targetDir: string;
	features: string[];
};

const generateFeatures = async ({ targetDir, features }: GenerateFeatures) => {
	const featuresDir = path.resolve(targetDir, "src", "features");

	await mkdir(featuresDir, {
		recursive: true,
	});

	for (const feature of features) {
		const featureDir = path.resolve(featuresDir, feature);

		assertPathInsideDirectory({
			parentDir: featuresDir,
			targetPath: featureDir,
		});

		await mkdir(featureDir, {
			recursive: true,
		});
	}
};

export default generateFeatures;
