import {
	createPageComponentName,
	createPageTitle,
} from "../../../shared/utils/index.js";

export const createPageTemplate = (route: string): string => {
	const pageTitle = createPageTitle(route);
	const componentName = createPageComponentName(route);

	return `export default function ${componentName}() {
  return (
    <main>
      <h1>${pageTitle}</h1>
    </main>
  );
}
`;
};
