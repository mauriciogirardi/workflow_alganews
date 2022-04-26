import { Service } from "mauricio.girardi-sdk/dist/Service";

const { API_BASE_URL } = process.env;

if (API_BASE_URL) Service.setBaseUrl(API_BASE_URL);
