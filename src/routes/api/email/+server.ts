import sgMail from '@sendgrid/mail';
import {json} from '@sveltejs/kit';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY || "");

export async function POST({ request }) {
    try {
        const { name, phone, companyName, role, email, subject, message } = await request.json();

        const templatePath = path.resolve("src/templates/confirmationEmailTemplate.html");
        const csTeamTemplatePath = path.resolve("src/templates/csTeamEmailTemplate.html");

        let htmlTemplate = fs.readFileSync(templatePath, "utf8");
        let csTeamHtmlTemplate = fs.readFileSync(csTeamTemplatePath, "utf8");

        htmlTemplate = htmlTemplate
            .replaceAll("{{line}}", role)
            .replaceAll("{{email}}", email)
            .replaceAll("{{phone_number}}", phone);

        csTeamHtmlTemplate = csTeamHtmlTemplate.replaceAll("{{line}}", role)
        .replaceAll("{{email}}", email)
        .replaceAll("{{name}}", name)
        .replaceAll("{{company_name}}", companyName)
        .replaceAll("{{phone_number}}", phone);

        const msg = {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL || "no-reply@hackitba.com.ar",
            subject: subject,
            text: message,
            html: htmlTemplate,
        };

        const csTeamMsg = {
            to: "clararodriguezacevedo@gmail.com",
            from: process.env.SENDGRID_FROM_EMAIL || "no-reply@hackitba.com.ar",
            subject: "Se ha registrado un nuevo "+ role,
            text: `Nombre: ${name}, Email: ${email}, Empresa: ${companyName}, Telefono: ${phone}, Rol: ${role}`,
            html: csTeamHtmlTemplate,
        }

        await sgMail.send(msg);
        await sgMail.send(csTeamMsg);
        return json({ status: "success", message: "Email sent successfully" });
    } catch (err) {
        console.error("SendGrid Error:", err);
        return json({ status: "error", message: "Failed to send email" }, { status: 500 });
    }
}
