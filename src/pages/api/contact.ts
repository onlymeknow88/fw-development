import type { NextApiRequest, NextApiResponse } from "next"

import nodemailer from "nodemailer"

// Create Gmail transporter
const createGmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Contact API is working!" })
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { name, email, phone, company, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Create Gmail transporter
    const transporter = createGmailTransporter()

    // Verify transporter configuration
    await transporter.verify()

    // Email to business owner
    const businessEmailOptions = {
      from: `"FW Development" <${process.env.GMAIL_USER}>`,
      to: process.env.BUSINESS_EMAIL || "fadjri.w@gmail.com",
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #59E2C5;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
          </div>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Subject</h3>
            <p>${subject}</p>
          </div>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This email was sent from your FW Development contact form.
            </p>
          </div>
        </div>
      `,
    }

    // Auto-reply email to customer
    const customerEmailOptions = {
      from: `"FW Development" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting FW Development",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #59E2C5;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting FW Development. We've received your message and will get back to you within 24 hours.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out our services page</li>
            <li>Call us directly at +62 853-91000-900</li>
            <li>Email us at fadjri.w@gmail.com</li>
          </ul>

          <div style="margin-top: 30px; padding: 20px; background: #59E2C5; color: white; border-radius: 8px;">
            <h3 style="margin-top: 0;">FW Development</h3>
            <p style="margin-bottom: 0;">Professional development services with transparent pricing and quality results.</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              FW Development Team<br>
              Balikpapan, Indonesia
            </p>
          </div>
        </div>
      `,
    }

    // Send emails
    const businessEmailResult = await transporter.sendMail(businessEmailOptions)
    const customerEmailResult = await transporter.sendMail(customerEmailOptions)

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      businessEmailId: businessEmailResult.messageId,
      customerEmailId: customerEmailResult.messageId,
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return res.status(500).json({ error: "Failed to send email. Please try again later." })
  }
}
