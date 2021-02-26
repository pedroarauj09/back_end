import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateUsers1614101690348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { // Create tables
        await queryRunner.createTable(
            new Table({
              name: "users", 
              columns: [
                  {
                      name: "id", 
                      type: "uuid", // id
                      isPrimary: true, // Primary Key
                  },
                  {
                      name: "name",
                      type: "varchar", // String
                  },
                  {
                      name: "email",
                      type: "varchar",
                  },
                  {
                      name: "created_at",
                      type: "timestamp", // Time, Dates
                      default: "now()", // Default value of date/time of now 
                  },

              ],

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> { // remove tables
        await queryRunner.dropTable("users");
    }

}
