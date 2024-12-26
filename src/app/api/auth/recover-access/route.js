import User from "@/models/User"
import connect from "@/utils/db"
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

  const {email} = await request.json() 

  await connect()

  try {
    const user = await User.findOne({email})

    if(!user) {
      return new NextResponse("O usuário com este e-mail não foi encontrado. Por favor, crie um perfil", {
          status: 401,
        })
    } 

    ///create token 
    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
      },
      process.env.JWT_KEY,
     {expiresIn: 60 * 60})

    const mailOptions = {
      from: ' "MOTOPOST" <eformaliza@gmail.com>',
      to: email,
      subject: 'Recuperação de acesso. MOTOPOST.',
      html: `
      <body style="background:#626262;">
       <div style="font-family: arial;  font-size: 16px; text-align: center; color:white; background:#2b2737; padding: 30px 20px 80px;">
          <h2>MOTOPOST</h2>
          <p style="font-size: 18px; line-height: 35px;">Prezado <span style="color:crimson; font-size: 20px; font-weight: 600;">${user.name},</span></p>
          <p style="line-height: 25px;">Para recuperar o seu acesso ao <a style="text-decoration:none; font-size: 20px; color: white; font-weight: bold;" href="${process.env.BASE_URL}">MOTOPOST</a>, por favor, clique abaixo: </p>
          <a style="color:crimson; font-weight: 600; cursor: pointer;" href="${process.env.BASE_URL}/api/auth/request-change?token=${token}">Recuperar</a>
          <p style="font-size: 13px; margin-top: 30px; line-height: 18px;"> Caso você não seja ${user.name}, e não tenha se cadastrado no MOTOPOST, por favor, ignore esta mensagem.
          </p>
        </div>
      </body>
      `
    }

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(info)
          console.log('Email with request is sent to your email account')
        }
      })
    })

    return new NextResponse(`Para recuperar o acesso por favor confira abre seu e-mail: ${email}`, {
      status: 201,
    })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}