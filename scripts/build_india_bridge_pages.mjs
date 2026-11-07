// Historical entry point: retain one useful guide and redirect its class aliases.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('./seo-maintenance/consolidate-pages.cjs').updateIndiaPages();
console.log('Updated the consolidated India Class 1–5 guide and five redirects.');
