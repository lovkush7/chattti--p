import {v2 as cloudinary} from "cloudinary"
import { envconfig } from "../config/env.config.ts"

 cloudinary.config({
    cloud_name: envconfig.CLOUD_NAME!,
    api_key: envconfig.API_KEY!,
    api_secret: envconfig.API_SECRET!
});
export {cloudinary}