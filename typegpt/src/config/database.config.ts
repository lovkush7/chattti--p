import { DataSource} from "typeorm"
// import User from "../entities/user.entity.js";
// import Userdetails from "../entities/userdetails.entity.js";
import { envconfig } from "./env.config.js";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import User from "../entities/user.entities.ts";
import { Profile } from "../entities/Profile.entities.ts";
import { Messages } from "../entities/messages.entities.ts";
// import Token from "../entities/Token.entities.js";
// import { Photo } from "../entities/photos.entity.ts";
// import { Category } from "../entities/Catogory.entities.ts";
// import { Question } from "../entities/Question.entities.ts";
// import { media } from "../entities/media.entitits.ts";

const AppDataSource = new DataSource({
    type: "postgres",
    host: envconfig.DB_HOST!,
    port: +(envconfig.DB_PORT! || 5432),
    username: envconfig.DB_USERNAME!,
    password: envconfig.DB_PASSWORD!, 
    database: envconfig.DB_NAME!,
    entities: [User, Profile,Messages],
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    cache: true
});
export default AppDataSource;