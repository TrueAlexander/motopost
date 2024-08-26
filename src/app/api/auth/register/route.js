import User from "@/models/User"
import connect from "@/utils/db"
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

//mail sender details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eformaliza@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
})

export const POST = async (request) => {

  const {name, email, password, isAdmin, emailVerified} = await request.json() 

  await connect()

  const hashedPassword = await bcrypt.hash(password, 5)

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: isAdmin,
    emailVerified: emailVerified
  })

  try {
    const user = await newUser.save()

    ///create token 
    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
      },
      process.env.JWT_KEY,
     {expiresIn: 60 * 60})

    ///
    const mailOptions = {
      from: ' "RUSSOLINGUO" <eformaliza@gmail.com>',
      to: email,
      subject: `RUSSOLINGUO. ${name}, verifique seu email!`,
      html: `
      <body style="background:#2b2737;">
        <div style="font-family: arial;  font-size: 16px; text-align: center; color:white; background:#2b2737; padding: 30px 20px 80px;">
          <h2>RUSSOLINGUO</h2>
          <p style="font-size: 18px; line-height: 35px;">Prezado <span style="color:#9f50ac; font-size: 20px; font-weight: 600;">${user.name},</span> obrigado pelo cadastro no <a style="text-decoration:none; font-size: 20px; color: white; font-weight: bold;" href="${process.env.URL_BASE}">RUSSOLINGUO app</a></p>
          <p style="line-height: 25px;">Por favor, valide  seu e-mail para ativar seu perfil:</p>
          <a style="color:#9f50ac; font-weight: 600;" href="${process.env.URL_BASE}/api/auth/verify-email?token=${token}">Clique aqui!</a>
          <p style="font-size: 13px; margin-top: 30px; line-height: 18px;"> Caso você não seja ${user.name}, e não tenha se cadastrado no RUSSOLINGUO, por favor, ignore esta mensagem.
          </p>
        </div>
      </body>
      `}

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(info)
          console.log('Verification email is sent to your email account')
        }
      })
    })

    return new NextResponse("User has been created", {
      status: 201,
    })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}
