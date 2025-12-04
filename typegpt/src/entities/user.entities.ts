import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { commonentities } from "./common.entities.ts";
import bcrypt from "bcrypt"
import { Profile } from "./Profile.entities.ts";
import { Messages } from "./messages.entities.ts";
import { profile } from "console";

@Entity()
class User extends commonentities{ 

    @Column("varchar")
    fullname: string;

    @Column("varchar")
    email: string;

    @Column("varchar")
    password: string;
 
    @BeforeInsert()
     async hashedpassword (){
     this.password = await bcrypt.hash(this.password,10);
     }

     @OneToOne(()=>Profile,{cascade:true,eager:true})
     @JoinColumn()
     profile: Profile;


    @OneToMany(()=>Messages,(messages)=>messages.sender)
    sendMessages: Messages[];


    @OneToMany(()=>Messages,(messages)=>messages.reciver)
    recivedMessages: Messages[];
}
export default User