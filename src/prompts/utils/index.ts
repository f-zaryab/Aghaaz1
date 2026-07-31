const FEATURE_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const validatePageRoute = (route: string): true | string => {
	const normalizedRoute = route.trim().replace(/^\/+|\/+$/g, "");

	if (!normalizedRoute) {
		return true;
	}

	if (normalizedRoute.includes("..")) {
		return `Route "${route}" cannot contain "..".`;
	}

	if (normalizedRoute.includes("\\")) {
		return `Route "${route}" must use forward slashes.`;
	}

	const segments = normalizedRoute.split("/");

	for (const segment of segments) {
		if (!segment) {
			return `Route "${route}" contains an empty segment.`;
		}

		if (!isValidRouteSegment(segment)) {
			return `Invalid route segment "${segment}" in "${route}".`;
		}
	}

	return true;
};

const isValidRouteSegment = (segment: string): boolean => {
	const staticSegmentPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

	const dynamicSegmentPattern = /^\[[a-zA-Z][a-zA-Z0-9_-]*\]$/;

	return (
		staticSegmentPattern.test(segment) || dynamicSegmentPattern.test(segment)
	);
};

const normalizePageRoute = (route: string): string => {
	return route
		.trim()
		.replace(/^\/+|\/+$/g, "")
		.replace(/\/+/g, "/");
};

// ---------------------------------------------------------------//
export const validatePageInput = (value: string): true | string => {
	const routes = value.split(",");

	for (const route of routes) {
		const normalizedRoute = route.trim();

		if (!normalizedRoute) {
			continue;
		}

		const validationResult = validatePageRoute(normalizedRoute);

		if (validationResult !== true) {
			return validationResult;
		}
	}

	return true;
};

export const parsePageRoutes = (value: string): string[] => {
	const routes = value
		.split(",")
		.map(normalizePageRoute)
		.filter((route): route is string => Boolean(route));

	return [...new Set(routes)];
};

// ---------------------------------------------------------------//
export const parseFeatureNames = (value: string): string[] => {
	return [
		...new Set(
			value
				.split(",")
				.map((feature) => feature.trim().toLowerCase())
				.filter(Boolean),
		),
	];
};

export const validateFeatureInput = (value: string): true | string => {
	const features = parseFeatureNames(value);

	if (features.length === 0) {
		return "Enter at least one feature.";
	}

	const invalidFeature = features.find(
		(feature) => !FEATURE_NAME_PATTERN.test(feature),
	);

	if (invalidFeature) {
		return `"${invalidFeature}" is invalid. Use lowercase letters, numbers, and hyphens only.`;
	}

	return true;
};
