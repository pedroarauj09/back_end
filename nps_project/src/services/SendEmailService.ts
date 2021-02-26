import nodemailer, {Transporter} from "nodemailer";

import handlebars from 'handlebars'
import fs from 'fs'

class SendEmailService{
    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then((account) =>{
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth:{
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter; // Use this variable outside of constructor
        });
    }

    async execute(to: string, subject: string, variables: object, path: string){
        
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const mailTemplateParse = handlebars.compile(templateFileContent)
        
        const html = mailTemplateParse(variables)

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com>"
        })

        console.log("Message sent: %s", message.messageId);
        console.log("Preview Url: %s", nodemailer.getTestMessageUrl(message));

    }


}
export default new SendEmailService(); // to create this instance when its executed 