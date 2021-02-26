import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("users-surveys")
class UserSurvey{

    @PrimaryColumn()
    readonly id: string; // dont let user to change this 

    @Column()
    user_id: string;

    @ManyToOne(()=>User)
    @JoinColumn({name: "user_id"})
    user: User
    
    @Column()
    survey_id: string;
    
    @ManyToOne(()=>Survey)
    @JoinColumn({name: "survey_id"})
    survey: Survey
    
    @Column()
    value : number;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){ // if id not exists, this id will have value of uuid
            this.id = uuid()
        }
    }
}

export {UserSurvey};