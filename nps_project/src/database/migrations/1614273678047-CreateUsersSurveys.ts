import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersSurveys1614273678047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users-surveys",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "survey_id",
                        type: "uuid"
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true // this column will be null at first, only will be filled when user answer the email
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }

                ],
                foreignKeys:[
                    {
                        name: "FK_user",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames:["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE" // any change on this column, will modify too on referencedT table

                    },
                    {
                        name: "FK_survey",
                        referencedTableName: "surveys",
                        referencedColumnNames: ["id"],
                        columnNames:["survey_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            }) 
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users-surveys")
    }

}
