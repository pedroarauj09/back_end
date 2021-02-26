import {EntityRepository, Repository } from "typeorm";
import { UserSurvey } from "../models/UserSurvey";

@EntityRepository(UserSurvey)
class UsersSurveysRepo extends Repository<UserSurvey> {

}

export{ UsersSurveysRepo}