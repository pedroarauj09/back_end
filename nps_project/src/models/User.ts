import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity("users")
class User{

    @PrimaryColumn()
    readonly id: string; // dont let user to change this 

    @Column()
    name: string;

    @Column()
    email: string;
    
    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){ // if id not exists, this id will have value of uuid
            this.id = uuid()
        }
    }
}

export {User};