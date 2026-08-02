import type { FrontendHttpClient } from "../../../../../../types/project-config.types.js";

export const getHttpClientPackages = (httpOpt: FrontendHttpClient) => {
	switch (httpOpt) {
		case "axios":
			return ["axios"];

		case "ky":
			return ["ky"];

		case "native-fetch":
			return [];

		default: {
			const exhaustiveCheck: never = httpOpt;
			throw new Error(`Unsupported HTTP client: ${exhaustiveCheck}`);
		}
	}
};
