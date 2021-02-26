import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from "yup"


class UserController{
    async create(request: Request, response: Response){
       
       const{name,email} = request.body;
       
       // Validation of User
       const schema = yup.object().shape({
           name: yup.string().required("Name is required"),
           email: yup.string().email().required("Email invalid")
       })

       /* Another way to do validation
       if (!(await !schema.isValid(request.body))){
           return response.status(400).json({ error: "Validation Failed. Try again"})
       }
       */

       // Validation of all camps
       try{
           await schema.validate(request.body, {abortEarly:false})
       } catch(err){
           return response.status(400).json({ error: err})
       }

       
       
       const usersRepository = getCustomRepository(UsersRepository); // create repo

       // SQL: SELECT * FROM USERS WHERE EMAIL = "EMAIL"
       const repeatedUser = await usersRepository.findOne({email}); // find if already exists some user with the email

        if (repeatedUser){
            return response.status(400).json({
                error: "User already exists",
            });
        }

       const user = usersRepository.create({ // create user in repo
           name,email
       });
       
       await usersRepository.save(user);

       return response.status(201).json(user); // status(201): created sucessfully
    }
}

export { UserController };

