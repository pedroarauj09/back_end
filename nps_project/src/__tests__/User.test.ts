import request from "supertest"
import createConnection  from "../database";
import {app} from "../app"
import { getConnection } from "typeorm";


describe("Users", ()=> { //All tests from describe
    
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


    it("Should be able to create a new user", async()=>{ // describe with many details as possible what test has to test
        const response = await request(app).post("/users") // Test the route users and send fake data 
        .send({
            email: "user2@example.com",
            name: "User2 Example"
        })

        expect(response.status).toBe(201); // Expect response to be status (201) that represent that was created sucessfully
    })
    it("Should not be able to create a user with exists email", async()=>{ // describe with many details as possible what test has to test
        const response = await request(app).post("/users") // Test the route users and send fake data 
        .send({
            email: "user2@example.com",
            name: "User2 Example"
        })

        expect(response.status).toBe(400); 
    })
});