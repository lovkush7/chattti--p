import { Column, Entity } from "typeorm";
import { commonentities } from "./common.entities.ts";
import { profile } from "console";

@Entity()
  export class Profile extends commonentities {

    @Column("varchar")
    profilepic: string;

}

