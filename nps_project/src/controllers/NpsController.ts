// Calculate NPS:
    // ((Promoters - detractors) / number of Answers ) * 100 (%)

import { Request,Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { UsersSurveysRepo } from "../repositories/UsersSurveysRepo";

class NpsController{
    async execute(resquest: Request, response: Response){
        const {survey_id} = resquest.params

        const surveyUserRepo = getCustomRepository(UsersSurveysRepo)
        
        const surveysUsers = await surveyUserRepo.find({
            survey_id,
            value: Not(IsNull()),

        })
        
        // get number of detractors
        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length

        // get number of promoters
        const promoter = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length

        // get number of passive
        const passive = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length

        const totalAnswers = surveysUsers.length;
        
        // calculate NPs
        const calculate = Number(((promoter - detractor) / totalAnswers)*100).toFixed(2)

        return response.json({
            detractor,
            promoter, 
            passive,
            totalAnswers,
            nps: calculate
        })
    }
}
export{NpsController}