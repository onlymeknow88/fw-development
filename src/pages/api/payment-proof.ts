import type { NextApiRequest, NextApiResponse } from "next"

import { IncomingForm } from "formidable"
import { promises as fs } from "fs"
import { join } from "path"
import nodemailer from "nodemailer"
import { tmpdir } from "os"

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

interface ServiceItem {
  id: string
  name: string
  price: number
  hours?: number
}

interface AddOnItem {
  id: string
  name: string
  price: number
}

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
    return res.status(200).json({ message: "Payment proof API is working!" })
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // Use temporary directory for file uploads
    const tempUploadDir = join(tmpdir(), "payment-proofs")
    
    // Parse form data with temp directory
    const form = new IncomingForm({
      uploadDir: tempUploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    })

    // Ensure temp upload directory exists
    try {
      await fs.access(tempUploadDir)
    } catch {
      await fs.mkdir(tempUploadDir, { recursive: true })
    }

    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        else resolve([fields, files])
      })
    })

    const paymentProof = Array.isArray(files.paymentProof) ? files.paymentProof[0] : files.paymentProof
    const customerPhone = Array.isArray(fields.customerPhone) ? fields.customerPhone[0] : fields.customerPhone
    const additionalNotes = Array.isArray(fields.additionalNotes) ? fields.additionalNotes[0] : fields.additionalNotes
    const orderDataStr = Array.isArray(fields.orderData) ? fields.orderData[0] : fields.orderData

    if (!paymentProof || !customerPhone || !orderDataStr) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const orderData = JSON.parse(orderDataStr)

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = paymentProof.originalFilename?.split(".").pop() || "jpg"
    const fileName = `payment-${orderData.orderId}-${timestamp}.${fileExtension}`
    const tempFilePath = join(tempUploadDir, fileName)

    // Move file to temp location with proper name
    await fs.rename(paymentProof.filepath, tempFilePath)

    // Read file for email attachment
    const fileBuffer = await fs.readFile(tempFilePath)

    // Prepare data for email
    const paymentData = {
      orderId: orderData.orderId,
      customerName: orderData.customerInfo.name,
      customerEmail: orderData.customerInfo.email,
      customerPhone: customerPhone,
      amount: orderData.total,
      services: orderData.services,
      addOns: orderData.addOns,
      additionalNotes: additionalNotes || "",
      submittedAt: new Date().toISOString(),
    }

    // Format services for email
    const servicesHtml = orderData.services
      .map(
        (service: ServiceItem) =>
          `<li>${service.name} - ${new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(service.price)}${service.hours ? ` (${service.hours} hours)` : ""}</li>`,
      )
      .join("")

    // Format add-ons for email
    const addOnsHtml =
      orderData.addOns.length > 0
        ? orderData.addOns
            .map(
              (addOn: AddOnItem) =>
                `<li>${addOn.name} - ${new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(addOn.price)}</li>`,
            )
            .join("")
        : ""

    try {
      // Create Gmail transporter
      const transporter = createGmailTransporter()

      // Verify transporter configuration
      await transporter.verify()

      // Send email to business owner with payment proof attachment
      const businessEmailOptions = {
        from: `"FW Development" <${process.env.GMAIL_USER}>`,
        to: process.env.BUSINESS_EMAIL || "fadjri.w@gmail.com",
        subject: `🔔 New Payment Proof - Order ${orderData.orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #59E2C5;">
                <h1 style="color: #59E2C5; margin: 0; font-size: 24px;">🔔 New Payment Proof Submitted</h1>
                <p style="color: #666; margin: 5px 0 0 0;">FW Development Payment Notification</p>
              </div>

              <!-- Order Information -->
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #333; margin-top: 0; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">📋 Order Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Order ID:</td>
                    <td style="padding: 8px 0; color: #333; font-family: monospace; background: #e9ecef; padding: 4px 8px; border-radius: 4px;">${paymentData.orderId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Customer:</td>
                    <td style="padding: 8px 0; color: #333;">${paymentData.customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0; color: #333;">${paymentData.customerEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px 0; color: #333;">${paymentData.customerPhone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Amount:</td>
                    <td style="padding: 8px 0; color: #59E2C5; font-weight: bold; font-size: 18px;">${new Intl.NumberFormat(
                      "id-ID",
                      {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      },
                    ).format(paymentData.amount)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Submitted:</td>
                    <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</td>
                  </tr>
                </table>
              </div>

              <!-- Services -->
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin-top: 0; font-size: 16px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">📦 Services Ordered</h3>
                <ul style="margin: 10px 0; padding-left: 20px; color: #333;">
                  ${servicesHtml}
                </ul>
                
                ${
                  addOnsHtml
                    ? `
                <h4 style="color: #333; margin: 15px 0 5px 0; font-size: 14px;">🎯 Additional Services</h4>
                <ul style="margin: 10px 0; padding-left: 20px; color: #333;">
                  ${addOnsHtml}
                </ul>
                `
                    : ""
                }
              </div>

              <!-- Additional Notes -->
              ${
                paymentData.additionalNotes
                  ? `
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                <h4 style="color: #856404; margin-top: 0; font-size: 14px;">💬 Customer Notes</h4>
                <p style="color: #856404; margin: 0; font-style: italic;">"${paymentData.additionalNotes}"</p>
              </div>
              `
                  : ""
              }

              <!-- Payment Proof Info -->
              <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                <h4 style="color: #0c5460; margin-top: 0; font-size: 14px;">📸 Payment Proof</h4>
                <p style="color: #0c5460; margin: 0;">Payment screenshot is attached to this email. Please verify the payment details and contact the customer for confirmation.</p>
              </div>

              <!-- Action Required -->
              <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                <h4 style="color: #721c24; margin-top: 0; font-size: 14px;">⚡ Action Required</h4>
                <ul style="color: #721c24; margin: 10px 0; padding-left: 20px;">
                  <li>Verify the payment proof attachment</li>
                  <li>Check OVO account for incoming payment</li>
                  <li>Contact customer at ${paymentData.customerPhone} for confirmation</li>
                  <li>Update project status and begin work</li>
                </ul>
              </div>

              <!-- Footer -->
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  This email was automatically generated by FW Development payment system.<br>
                  For support, contact: fadjri.w@gmail.com | +62 853-91000-900
                </p>
              </div>

            </div>
          </div>
        `,
        attachments: [
          {
            filename: `payment-proof-${orderData.orderId}.${fileExtension}`,
            content: fileBuffer,
            contentType: paymentProof.mimetype || "image/jpeg",
          },
        ],
      }

      // Send email to business owner
      const businessEmailResult = await transporter.sendMail(businessEmailOptions)

      // Send confirmation email to customer
      const customerEmailOptions = {
        from: `"FW Development" <${process.env.GMAIL_USER}>`,
        to: orderData.customerInfo.email,
        subject: `✅ Payment Proof Received - Order ${orderData.orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #59E2C5;">
                <h1 style="color: #59E2C5; margin: 0; font-size: 24px;">✅ Payment Proof Received</h1>
                <p style="color: #666; margin: 5px 0 0 0;">Thank you for your submission!</p>
              </div>

              <!-- Greeting -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #333; font-size: 18px;">Hi ${orderData.customerInfo.name},</h2>
                <p style="color: #666; line-height: 1.6;">
                  We've successfully received your payment proof for order <strong style="color: #59E2C5;">${orderData.orderId}</strong>. 
                  Our team will verify your payment within 1-2 hours and get back to you with confirmation.
                </p>
              </div>

              <!-- Order Summary -->
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin-top: 0; font-size: 16px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">📋 Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Order ID:</td>
                    <td style="padding: 8px 0; color: #333; font-family: monospace; background: #e9ecef; padding: 4px 8px; border-radius: 4px;">${orderData.orderId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Total Amount:</td>
                    <td style="padding: 8px 0; color: #59E2C5; font-weight: bold; font-size: 18px;">${new Intl.NumberFormat(
                      "id-ID",
                      {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      },
                    ).format(orderData.total)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Submitted:</td>
                    <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString("id-ID")}</td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps -->
              <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h4 style="color: #155724; margin-top: 0; font-size: 16px;">🚀 What happens next?</h4>
                <ol style="color: #155724; margin: 15px 0; padding-left: 20px; line-height: 1.8;">
                  <li><strong>Payment Verification (1-2 hours)</strong><br>
                      <span style="font-size: 14px; color: #6c757d;">We'll verify your payment and send confirmation</span></li>
                  <li><strong>Project Kickoff</strong><br>
                      <span style="font-size: 14px; color: #6c757d;">We'll contact you to discuss project details and timeline</span></li>
                  <li><strong>Development Begins</strong><br>
                      <span style="font-size: 14px; color: #6c757d;">Our team will start working on your project</span></li>
                </ol>
              </div>

              <!-- Contact Info -->
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h4 style="color: #333; margin-top: 0; font-size: 16px;">📞 Need Help?</h4>
                <p style="color: #666; margin: 10px 0;">If you have any questions or concerns, feel free to contact us:</p>
                <ul style="color: #59E2C5; margin: 10px 0; padding-left: 20px; list-style: none;">
                  <li style="margin: 5px 0;">📧 Email: fadjri.w@gmail.com</li>
                  <li style="margin: 5px 0;">📱 Phone: +62 853-91000-900</li>
                  <li style="margin: 5px 0;">💬 WhatsApp: Available 24/7</li>
                </ul>
              </div>

              <!-- Footer -->
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <div style="margin-bottom: 15px;">
                  <h3 style="color: #59E2C5; margin: 0; font-size: 18px;">FW Development</h3>
                  <p style="color: #666; margin: 5px 0; font-size: 14px;">Professional Development Services</p>
                </div>
                <p style="color: #999; font-size: 12px; margin: 0;">
                  This is an automated confirmation email. Please do not reply to this email.<br>
                  © 2024 FW Development. All rights reserved.
                </p>
              </div>

            </div>
          </div>
        `,
      }

      // Send email to customer
      const customerEmailResult = await transporter.sendMail(customerEmailOptions)

      console.log("Emails sent successfully:", {
        businessEmailId: businessEmailResult.messageId,
        customerEmailId: customerEmailResult.messageId,
      })

      // Clean up temporary file after sending emails
      try {
        await fs.unlink(tempFilePath)
        console.log("Temporary file cleaned up:", tempFilePath)
      } catch (cleanupError) {
        console.warn("Failed to cleanup temporary file:", cleanupError)
      }

      return res.status(200).json({
        success: true,
        message: "Payment proof submitted and emails sent successfully",
        orderId: orderData.orderId,
        fileName: fileName,
        emailsSent: {
          business: businessEmailResult.messageId,
          customer: customerEmailResult.messageId,
        },
      })
    } catch (emailError) {
      console.error("Email sending error:", emailError)

      // Clean up temporary file even if email fails
      try {
        await fs.unlink(tempFilePath)
        console.log("Temporary file cleaned up after email error:", tempFilePath)
      } catch (cleanupError) {
        console.warn("Failed to cleanup temporary file after email error:", cleanupError)
      }

      // Still return success for file upload, but note email failure
      return res.status(200).json({
        success: true,
        message: "Payment proof uploaded successfully, but email notification failed. We'll contact you directly.",
        orderId: orderData.orderId,
        fileName: fileName,
        emailError: "Failed to send email notifications",
        emailErrorDetails: emailError instanceof Error ? emailError.message : "Unknown email error",
      })
    }
  } catch (error) {
    console.error("Payment proof submission error:", error)
    return res.status(500).json({ error: "Failed to submit payment proof. Please try again later." })
  }
}