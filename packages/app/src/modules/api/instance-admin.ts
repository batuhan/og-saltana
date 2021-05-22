import { initSaltanaCoreSdk } from "./utils";

const apiKey = process.env.SALTANA_CORE_SECRET_API_KEY;

if (!apiKey) throw new Error("Missing Saltana secret API key");

const api = initSaltanaCoreSdk({ apiKey });

export default api;
