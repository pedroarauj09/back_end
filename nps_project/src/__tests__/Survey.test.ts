import request from "supertest"
import createConnection  from "../database";
import {app} from "../app"
import { getConnection } from "typeorm";



describe("Surveys", ()=> { //All tests from describe
    
    beforeAll(async()=> { // Before tests, create migrations
        const connection = await createConnection();
        await connection.runMigrations(); 
    })

    //REMOVE TABLES OF TEST AUTOMATICALLY AFTER TESTS ARE COMPLETED
    afterAll(async()=>{
        const connection = getConnection()
        await connection.dropDatabase()
        await connection.close()
    })

    it("Should be able to create a new survey", async()=>{ // describe with many details as possible what test has to test
        const response = await request(app).post("/surveys") // Test the route users and send fake data 
        .send({
            title: "Title example",
            description: "Description example",
        })

        expect(response.status).toBe(201); 
        expect(response.body).toHaveProperty("id"); // Verificate if id its being assigned with some value
    })
    it("Should be able to create a new survey", async()=>{ // describe with many details as possible what test has to test
        await request(app).post("/surveys") // Test the route users and send fake data 
        .send({
            title: "Title example2",
            description: "Description example2",
        })
        const response = await request(app).get("/surveys")

        expect(response.body.length).toBe(2) // Test if the length of body its 2, because was sent two different surveys

    })

});