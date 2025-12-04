import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class commonentities extends BaseEntity {
@PrimaryGeneratedColumn("uuid")
id: number;

@CreateDateColumn({type:"time with time zone"})
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;
}
