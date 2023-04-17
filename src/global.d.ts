declare module "*.module.css";
declare module "*.module.scss";
declare module "*.ico";
declare module "*.png";
declare module "*.jpeg";
interface ImportMeta {
	readonly env: Record<string, string>;
}

interface Window {
	MSAL_AUTH_TOKEN: any;
}
