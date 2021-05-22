import { initSaltanaCoreSdk } from "./utils";

const apiKey = process.env.NEXT_PUBLIC_SALTANA_CORE_PUBLISHABLE_KEY;

if (!apiKey) throw new Error("Missing Saltana publishable API key");

const api = initSaltanaCoreSdk({ apiKey });

export default api;
