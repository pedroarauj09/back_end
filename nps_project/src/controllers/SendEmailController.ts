import { getCustomRepository } from "typeorm";
import { resolve} from 'path';
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { UsersSurveysRepo } from "../repositories/UsersSurveysRepo";
import { Request, Response } from "express";
import SendEmailService from "../services/SendEmailService";


class SendEmailController{
    async execute(request: Request, response: Response){
        const {email, id} = request.body;

        const usersRepo = getCustomRepository(UsersRepository);
        const surveysRepo = getCustomRepository(SurveysRepository);
        const users_surveysRepo = getCustomRepository(UsersSurveysRepo);

        //Verify if user Exists 
        const userExist = await usersRepo.findOne({email});
        if(!userExist){
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        // Verify if survey id Exists
        const surveyExist = await surveysRepo.findOne({id})
        if(!surveyExist){
            return response.status(400).json({
                error: "Survey does not exists",
            });
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        // Verify if surveyUser exist
        const surveyUserAlreadyExist = await users_surveysRepo.findOne({
            where: {user_id: userExist.id,value: null},
            relations: ["user", "survey"]
        }) 
        
        const variables = {
            name: userExist.name,
            title: surveyExist.title,
            description:surveyExist.description,
            id: "",
            link: process.env.URL_MAIL,
        }
        if (surveyUserAlreadyExist){
            variables.id = surveyUserAlreadyExist.id
            // Send email to one existent user 
            await SendEmailService.execute(email, surveyExist.title, variables, npsPath)
            return response.json(surveyUserAlreadyExist)
        }
        // Save the content on UserSurvey table if not exists The surveyUser yet
            const userSurvey = users_surveysRepo.create({
                user_id: userExist.id,
                survey_id: surveyExist.id,
            })
            await users_surveysRepo.save(userSurvey);

            // Send email to user 

            variables.id = userSurvey.id
            await SendEmailService.execute(email, surveyExist.title, variables, npsPath)
        
            return response.json(userSurvey)
    }
}

export {SendEmailController}