import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import  { commonentities } from "./common.entities.ts";
import User from "./user.entities.ts";

@Entity()
export class Messages extends commonentities {

    @ManyToOne(()=> User,(user)=>user.sendMessages)
    @JoinColumn({name: "senderId"})
    sender: User;

 


    @ManyToOne(()=> User, (user)=>user.recivedMessages)
    @JoinColumn({name: "reciverId"})
    reciver: User;


     

    @Column({type:"text", nullable: true})
    text?: string;


    @Column({type: "text", nullable: true})
    images?: string;

}
