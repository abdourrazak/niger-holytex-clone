import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    // Si pas de clé API Resend, logger seulement (dev mode)
    if (!process.env.RESEND_API_KEY) {
      console.log('📧 Email would be sent (no API key):')
      console.log('To:', to)
      console.log('Subject:', subject)
      console.log('HTML:', html)
      return { success: true, message: 'Email logged (dev mode)' }
    }

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Niger Holytex <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    })

    return { success: true, data }
  } catch (error: any) {
    console.error('Email error:', error)
    return { success: false, error: error.message }
  }
}

export function getVerificationEmailTemplate(verificationCode: string, userName?: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code de vérification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Niger Holytex</h1>
          <p style="color: white; margin: 10px 0 0 0;">La grâce au service de la pudeur</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Bienvenue ${userName ? userName : ''} !</h2>
          
          <p>Merci de vous être inscrit sur Niger Holytex. Pour finaliser votre inscription et accéder à l'application, veuillez entrer ce code de vérification :</p>
          
          <div style="text-align: center; margin: 40px 0;">
            <div style="background: white; 
                        border: 3px dashed #667eea; 
                        border-radius: 10px; 
                        padding: 20px; 
                        display: inline-block;">
              <p style="margin: 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Votre code de vérification</p>
              <p style="margin: 10px 0 0 0; 
                        font-size: 42px; 
                        font-weight: bold; 
                        color: #667eea; 
                        letter-spacing: 8px;
                        font-family: 'Courier New', monospace;">
                ${verificationCode}
              </p>
            </div>
          </div>
          
          <p style="text-align: center; color: #666; font-size: 14px;">
            Entrez ce code sur la page de vérification pour activer votre compte.
          </p>
          
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              ⚠️ <strong>Important :</strong> Ce code expire dans <strong>15 minutes</strong>. Ne le partagez avec personne !
            </p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Si vous n'avez pas créé de compte, vous pouvez ignorer cet email en toute sécurité.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2024 Niger Holytex. Tous droits réservés.</p>
        </div>
      </body>
    </html>
  `
}

export function getPasswordResetEmailTemplate(resetUrl: string, userName?: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Réinitialisation de mot de passe</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Niger Holytex</h1>
          <p style="color: white; margin: 10px 0 0 0;">La grâce au service de la pudeur</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Réinitialisation de mot de passe</h2>
          
          <p>Bonjour ${userName ? userName : ''} !</p>
          
          <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 40px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block;
                      font-weight: bold;">
              Réinitialiser mon mot de passe
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
          <p style="background: white; padding: 10px; border-radius: 5px; word-break: break-all; font-size: 12px;">
            ${resetUrl}
          </p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Ce lien expirera dans 1 heure.
          </p>
          
          <p style="color: #666; font-size: 14px;">
            Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2024 Niger Holytex. Tous droits réservés.</p>
        </div>
      </body>
    </html>
  `
}
