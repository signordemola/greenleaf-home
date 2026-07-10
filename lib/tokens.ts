import { randomBytes } from "crypto";

export const generatePortalToken = () => randomBytes(16).toString("base64url");
