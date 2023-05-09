declare module "*.module.css";
declare module "*.module.scss";
declare module "*.ico";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.json";

interface ImportMeta {
	readonly env: Record<string, string>;
}

interface Window {
	MSAL_AUTH_TOKEN: any;
}
