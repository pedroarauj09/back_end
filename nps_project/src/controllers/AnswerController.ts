import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersSurveysRepo } from "../repositories/UsersSurveysRepo";

class AnswerController{
    async execute(request: Request, response: Response){
        // get value that user chose 
        const {value} = request.params;
        
        // get id of user
        const {u} = request.query;

        const repoUserSurvey = getCustomRepository(UsersSurveysRepo)

        // Try to find user on UserSurvey Table
        const userSurvey = await repoUserSurvey.findOne({
            id: String(u),
        })

        // If Doesnt exist 
        if (!userSurvey){
            return response.status(400).json({
                error: "User Survey doesnt exist" 
            })
        }

        // If exist, save the value
        
        userSurvey.value = Number(value)
        await repoUserSurvey.save(userSurvey)

        return response.json(userSurvey)



    }
    
}
export {AnswerController}