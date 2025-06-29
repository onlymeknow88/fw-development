"use client"

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Copy,
  FileImage,
  FileText,
  Phone,
  Send,
  Upload,
  X,
} from "lucide-react"
import { Button, Card, CardBody, CardHeader, Divider, Image, Input, Textarea } from "@heroui/react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import Link from "next/link"
import type React from "react"
import ResponsiveNavbar from "../components/navbar"
import axios from "axios"
import jsPDF from "jspdf"

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

interface CustomerInfo {
  name: string
  email: string
  phone: string
  company?: string
  address?: string
  projectDescription?: string
  domainName?: string
}

interface OrderData {
  services: ServiceItem[]
  addOns: AddOnItem[]
  customerInfo: CustomerInfo
  total: number
  orderId: string
  createdAt?: string
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null)
  const [customerPhone, setCustomerPhone] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [paymentStep, setPaymentStep] = useState(1) // 1: Instructions, 2: Upload Proof, 3: Confirmation

  // OVO Merchant Details
  const ovoMerchantPhone = "085391000900"
  const ovoMerchantName = "FW Development"

  useEffect(() => {
    // Get order data from URL params
    const orderDataParam = searchParams.get("orderData")
    if (orderDataParam) {
      try {
        const data = JSON.parse(decodeURIComponent(orderDataParam))
        setOrderData(data)
        // Pre-fill customer phone if available
        if (data.customerInfo?.phone) {
          setCustomerPhone(data.customerInfo.phone)
        }
      } catch (error) {
        console.error("Error parsing order data:", error)
        router.push("/checkout")
      }
    } else {
      // Redirect back to checkout if no order data
      router.push("/checkout")
    }
  }, [searchParams, router])

  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const numberToIndonesianWords = (num: number): string => {
    const ones = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"]
    const teens = [
      "sepuluh",
      "sebelas",
      "dua belas",
      "tiga belas",
      "empat belas",
      "lima belas",
      "enam belas",
      "tujuh belas",
      "delapan belas",
      "sembilan belas",
    ]
    const tens = [
      "",
      "",
      "dua puluh",
      "tiga puluh",
      "empat puluh",
      "lima puluh",
      "enam puluh",
      "tujuh puluh",
      "delapan puluh",
      "sembilan puluh",
    ]
    const thousands = ["", "ribu", "juta", "miliar", "triliun"]

    if (num === 0) return "nol"

    const convertHundreds = (n: number): string => {
      let result = ""

      if (n >= 100) {
        if (Math.floor(n / 100) === 1) {
          result += "seratus "
        } else {
          result += ones[Math.floor(n / 100)] + " ratus "
        }
        n %= 100
      }

      if (n >= 20) {
        result += tens[Math.floor(n / 10)]
        if (n % 10 !== 0) {
          result += " " + ones[n % 10]
        }
      } else if (n >= 10) {
        result += teens[n - 10]
      } else if (n > 0) {
        result += ones[n]
      }

      return result.trim()
    }

    const convertThousands = (n: number): string => {
      if (n === 0) return ""

      let result = ""
      let thousandIndex = 0

      while (n > 0) {
        const chunk = n % 1000
        if (chunk !== 0) {
          let chunkText = convertHundreds(chunk)
          if (thousandIndex === 1 && chunk === 1) {
            chunkText = "se"
          }
          if (thousandIndex > 0) {
            chunkText += " " + thousands[thousandIndex]
          }
          result = chunkText + (result ? " " + result : "")
        }
        n = Math.floor(n / 1000)
        thousandIndex++
      }

      return result
    }

    return convertThousands(num) + " rupiah"
  }

  const generateInvoicePDF = () => {
    if (!orderData) return

    const doc = new jsPDF()

    // Set font to support Indonesian characters
    doc.setFont("helvetica")

    // Header - Company Info
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text("FW Development", 20, 25)
    doc.setFontSize(10)
    doc.text("Professional Development Services with Quality Results", 20, 32)

    // Invoice Title
    doc.setFontSize(14)
    doc.setTextColor(100, 100, 100)
    doc.text("INVOICE", 150, 25)

    // Invoice Details
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    const currentDate = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })

    doc.text(`INVOICE ${orderData.orderId}`, 150, 35)
    doc.text(`DATE: ${currentDate}`, 150, 42)

    // Bill To Section
    doc.setFontSize(10)
    doc.text("Bill To:", 20, 60)
    doc.text(`${orderData.customerInfo.name}`, 20, 72)
    doc.text(`${orderData.customerInfo.email}`, 20, 79)
    if (orderData.customerInfo.phone) {
      doc.text(`${orderData.customerInfo.phone}`, 20, 86)
    }
    if (orderData.customerInfo.company) {
      doc.text(`${orderData.customerInfo.company}`, 20, 93)
    }

    // For Section
    doc.text("For:", 120, 60)
    doc.text("Professional Development Services", 120, 72)

    // Table Header
    doc.setFillColor(240, 240, 240)
    doc.rect(20, 105, 170, 12, "F")
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text("DESCRIPTION", 25, 113)
    doc.text("AMOUNT", 160, 113)

    // Table Content
    let yPosition = 125
    const tableStartY = yPosition
    const tableWidth = 170
    const leftColumn = 25
    const rightColumn = 160

    // Services
    if (orderData.services.length > 0) {
      doc.setFontSize(9)
      doc.setTextColor(0, 0, 0)
      doc.text("DEVELOPMENT SERVICES:", leftColumn, yPosition)
      yPosition += 10

      orderData.services.forEach((service) => {
        doc.text(`• ${service.name}`, leftColumn + 5, yPosition)
        if (service.hours) {
          doc.text(`(${service.hours} hours)`, leftColumn + 5, yPosition + 7)
          yPosition += 7
        }
        doc.text(formatRupiah(service.price), rightColumn, yPosition)
        yPosition += 10
      })
    }

    // Add-ons
    if (orderData.addOns.length > 0) {
      yPosition += 5
      doc.text("ADDITIONAL SERVICES:", leftColumn, yPosition)
      yPosition += 10

      orderData.addOns.forEach((addOn) => {
        doc.text(`• ${addOn.name}`, leftColumn + 5, yPosition)
        doc.text(formatRupiah(addOn.price), rightColumn, yPosition)
        yPosition += 10
      })
    }

    // Draw table borders
    const tableHeight = yPosition - tableStartY + 10
    doc.setDrawColor(200, 200, 200)
    doc.rect(20, tableStartY - 10, tableWidth, tableHeight) // Outer border
    doc.line(150, tableStartY - 10, 150, yPosition + 5) // Vertical separator

    // Total Section
    yPosition = Math.max(yPosition + 20, 200)
    doc.setDrawColor(0, 0, 0)
    doc.line(120, yPosition, 190, yPosition)
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("TOTAL", 140, yPosition + 10)
    doc.text(formatRupiah(orderData.total), 160, yPosition + 10)

    // Amount in words
    yPosition += 25
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(`Terbilang: ${numberToIndonesianWords(orderData.total)}`, 20, yPosition)

    // Payment Terms
    yPosition += 20
    doc.setFontSize(9)
    doc.text("PAYMENT INFORMATION:", 20, yPosition)
    yPosition += 10
    doc.text("• Payment Method: OVO Transfer", 25, yPosition)
    doc.text("• OVO Number: 085391000900", 25, yPosition + 7)
    doc.text("• Account Name: Fadjri Wivindi", 25, yPosition + 14)
    doc.text(`• Reference: Order ${orderData.orderId}`, 25, yPosition + 21)

    yPosition += 35
    doc.text("TERMS & CONDITIONS:", 20, yPosition)
    yPosition += 10
    doc.text("• 50% down payment required to start the project", 25, yPosition)
    doc.text("• Remaining 50% upon project completion", 25, yPosition + 7)
    doc.text("• Payment verification within 1-2 hours", 25, yPosition + 14)
    doc.text("• Project timeline will be discussed after payment confirmation", 25, yPosition + 21)

    // Footer
    yPosition += 35
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text("Thank you for choosing FW Development for your project needs.", 20, yPosition)
    doc.text("This invoice was generated automatically by our system.", 20, yPosition + 7)
    doc.text("For questions, contact us at fadjri.w@gmail.com or +62 853-91000-900", 20, yPosition + 14)

    // Save PDF
    try {
      const fileName = `Invoice-${orderData.customerInfo.name.replace(/\s+/g, "-")}-${orderData.orderId}-${Date.now()}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      doc.save(`Invoice-${orderData.orderId}-${Date.now()}.pdf`)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setSubmitStatus({
          type: "error",
          message: "Please upload an image file (JPG, PNG, etc.)",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({
          type: "error",
          message: "File size must be less than 5MB",
        })
        return
      }

      setPaymentProof(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPaymentProofPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      setSubmitStatus({ type: null, message: "" })
    }
  }

  const removeFile = () => {
    setPaymentProof(null)
    setPaymentProofPreview(null)
  }

  const handleSubmitPaymentProof = async () => {
    if (!paymentProof || !customerPhone || !orderData) {
      setSubmitStatus({
        type: "error",
        message: "Please upload payment proof and enter your phone number",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const formData = new FormData()
      formData.append("paymentProof", paymentProof)
      formData.append("customerPhone", customerPhone)
      formData.append("additionalNotes", additionalNotes)
      formData.append("orderData", JSON.stringify(orderData))

      const response = await axios.post("/api/payment-proof", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 seconds for file upload
      })

      setSubmitStatus({
        type: "success",
        message: "Payment proof submitted successfully! We'll verify your payment within 1-2 hours.",
      })

      setPaymentStep(3)
    } catch (error) {
      console.error("Payment proof submission error:", error)

      if (axios.isAxiosError(error)) {
        setSubmitStatus({
          type: "error",
          message: error.response?.data?.error || "Failed to submit payment proof. Please try again.",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59E2C5] mx-auto mb-4"></div>
          <p className="text-[#CCD6F6]">Loading payment details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A192F]">
      {/* Header */}
      <ResponsiveNavbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className={`flex items-center ${paymentStep >= 1 ? "text-[#59E2C5]" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 1 ? "bg-[#59E2C5]" : "bg-gray-600"}`}
              >
                {paymentStep > 1 ? <CheckCircle className="h-5 w-5 text-white" /> : "1"}
              </div>
              <span className="ml-2 hidden sm:block">Payment Instructions</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-600"></div>
            <div className={`flex items-center ${paymentStep >= 2 ? "text-[#59E2C5]" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 2 ? "bg-[#59E2C5]" : "bg-gray-600"}`}
              >
                {paymentStep > 2 ? <CheckCircle className="h-5 w-5 text-white" /> : "2"}
              </div>
              <span className="ml-2 hidden sm:block">Upload Proof</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-600"></div>
            <div className={`flex items-center ${paymentStep >= 3 ? "text-[#59E2C5]" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 3 ? "bg-[#59E2C5]" : "bg-gray-600"}`}
              >
                {paymentStep >= 3 ? <CheckCircle className="h-5 w-5 text-white" /> : "3"}
              </div>
              <span className="ml-2 hidden sm:block">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Instructions */}
          <div className="lg:col-span-2 space-y-6">
            {paymentStep === 1 && (
              <>
                {/* OVO Payment Instructions */}
                <Card className="bg-[#112240]">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-[#59E2C5]" />
                      OVO Payment Instructions
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-6">
                    <div className="bg-[#59E2C5]/10 p-4 rounded-lg border border-[#59E2C5]/20">
                      <h4 className="font-semibold text-[#59E2C5] mb-2">Transfer to OVO Merchant</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[#6C7994]">Phone Number:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono">{ovoMerchantPhone}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(ovoMerchantPhone)}
                              className="text-[#59E2C5]"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#6C7994]">Account Name:</span>
                          <span className="text-white">{ovoMerchantName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#6C7994]">Amount:</span>
                          <span className="text-[#59E2C5] font-bold text-lg">{formatRupiah(orderData.total)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">How to Pay with OVO:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-[#6C7994]">
                        <li>Open your OVO app</li>
                        <li>Select &quot;Transfer&quot; or &quot;Kirim&quot;</li>
                        <li>Choose &quot;To OVO Account&quot; or &quot;Ke Akun OVO&quot;</li>
                        <li>
                          Enter phone number: <span className="text-white font-mono">{ovoMerchantPhone}</span>
                        </li>
                        <li>
                          Enter amount:{" "}
                          <span className="text-[#59E2C5] font-semibold">{formatRupiah(orderData.total)}</span>
                        </li>
                        <li>Add note: &quot;Order #{orderData.orderId}&quot;</li>
                        <li>Complete the transfer</li>
                        <li>Take a screenshot of the successful transaction</li>
                      </ol>
                    </div>

                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-yellow-500 mb-1">Important Notes:</h5>
                          <ul className="text-sm text-yellow-200 space-y-1">
                            <li>• Make sure to transfer the exact amount</li>
                            <li>• Include order ID in the transfer note</li>
                            <li>• Keep your transaction receipt</li>
                            <li>• Payment will be verified within 1-2 hours</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full border-[#59E2C5] text-[#59E2C5] hover:bg-[#59E2C5] hover:text-black font-semibold"
                      size="lg"
                       variant="bordered"
                      onClick={() => setPaymentStep(2)}
                    >
                      I&apos;ve Made the Payment
                    </Button>
                  </CardBody>
                </Card>
              </>
            )}

            {paymentStep === 2 && (
              <>
                {/* Upload Payment Proof */}
                <Card className="bg-[#112240]">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <Upload className="h-5 w-5 mr-2 text-[#59E2C5]" />
                      Upload Payment Proof
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-6">
                    {/* Status Message */}
                    {submitStatus.type && (
                      <div
                        className={`p-4 rounded-lg ${
                          submitStatus.type === "success"
                            ? "bg-green-500/10 border border-green-500/20 text-green-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}

                    {/* File Upload */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Payment Screenshot *</label>
                        {!paymentProof ? (
                          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-[#59E2C5] transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="payment-proof"
                            />
                            <label htmlFor="payment-proof" className="cursor-pointer">
                              <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-[#6C7994] mb-2">Click to upload payment screenshot</p>
                              <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                            </label>
                          </div>
                        ) : (
                          <div className="relative">
                            <img
                              src={paymentProofPreview! || "/placeholder.svg"}
                              alt="Payment proof"
                              className="w-full max-w-md mx-auto rounded-lg border border-gray-600"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={removeFile}
                              className="absolute top-2 right-2 bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <Input
                        label="Your Phone Number"
                        placeholder="Enter your phone number (e.g., 08123456789)"
                        variant="bordered"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        startContent={<Phone className="h-4 w-4 text-gray-400" />}
                        classNames={{
                          input: "text-white",
                          label: "text-white",
                          inputWrapper: "bg-[#0A192F] border-gray-600 focus-within:border-white",
                        }}
                        description="We'll send confirmation to this number"
                        required
                      />

                      <Textarea
                        label="Additional Notes (Optional)"
                        placeholder="Any additional information about your payment..."
                        variant="bordered"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        classNames={{
                          input: "text-white",
                          label: "text-white",
                          inputWrapper: "bg-[#0A192F] border-gray-600 focus-within:border-white",
                        }}
                        minRows={3}
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        variant="bordered"
                        className="border-gray-600 text-white"
                        onClick={() => setPaymentStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        className="w-full border-[#59E2C5] text-[#59E2C5] hover:bg-[#59E2C5] hover:text-black font-semibold"
                      size="lg"
                       variant="bordered"
                        onClick={handleSubmitPaymentProof}
                        isLoading={isSubmitting}
                        startContent={!isSubmitting && <Send className="h-4 w-4" />}
                        isDisabled={!paymentProof || !customerPhone || isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Payment Proof"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}

            {paymentStep === 3 && (
              <>
                {/* Confirmation */}
                <Card className="bg-[#112240]">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                      Payment Submitted Successfully
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-6 text-center">
                    <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
                      <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-white mb-2">Thank You!</h4>
                      <p className="text-[#6C7994] mb-4">
                        Your payment proof has been submitted successfully. We&apos;ll verify your payment and start working
                        on your project within 1-2 hours.
                      </p>
                      <div className="text-sm text-green-400">
                        <p>
                          Order ID: <span className="font-mono">{orderData.orderId}</span>
                        </p>
                        <p>
                          Amount: <span className="font-semibold">{formatRupiah(orderData.total)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-semibold text-white">What happens next?</h5>
                      <div className="space-y-3 text-left">
                        <div className="flex items-start space-x-3">
                          <Clock className="h-5 w-5 text-[#59E2C5] mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Payment Verification (1-2 hours)</p>
                            <p className="text-sm text-[#6C7994]">We&apos;ll verify your payment and send confirmation</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Send className="h-5 w-5 text-[#59E2C5] mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Project Kickoff</p>
                            <p className="text-sm text-[#6C7994]">
                              We&apos;ll contact you to discuss project details and timeline
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={generateInvoicePDF}
                        className="bg-blue-600 text-white font-semibold"
                        startContent={<FileText className="h-4 w-4" />}
                      >
                        Download Invoice PDF
                      </Button>
                      <Button as={Link} href="/services" variant="bordered" className="border-[#59E2C5] text-[#59E2C5] hover:bg-[#59E2C5] hover:text-white">
                        Browse More Services
                      </Button>
                      <Button as={Link} href="/contact" className="bg-[#59E2C5] text-white">
                        Contact Us
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-[#112240] sticky top-8">
              <CardHeader>
                <h3 className="text-xl font-bold text-white">Order Summary</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <p className="text-sm text-[#6C7994] mb-2">Order ID</p>
                  <p className="text-white font-mono">{orderData.orderId}</p>
                </div>

                <Divider />

                <div>
                  <p className="text-sm text-[#6C7994] mb-2">Customer</p>
                  <p className="text-white">{orderData.customerInfo.name}</p>
                  <p className="text-sm text-[#6C7994]">{orderData.customerInfo.email}</p>
                </div>

                <Divider />

                {/* Selected Services */}
                {orderData.services.length > 0 && (
                  <div>
                    <p className="text-sm text-[#6C7994] mb-2">Services</p>
                    <div className="space-y-2">
                      {orderData.services.map((service, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <div className="flex-1">
                            <span className="text-white">• {service.name}</span>
                            {service.hours && <span className="text-xs text-gray-500 ml-2">({service.hours}h)</span>}
                          </div>
                          <span className="text-white">{formatRupiah(service.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Add-ons */}
                {orderData.addOns.length > 0 && (
                  <div>
                    <p className="text-sm text-[#6C7994] mb-2">Add-ons</p>
                    <div className="space-y-2">
                      {orderData.addOns.map((addOn, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-white">• {addOn.name}</span>
                          <span className="text-white">{formatRupiah(addOn.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Divider />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-[#59E2C5]">{formatRupiah(orderData.total)}</span>
                </div>

                <div className="text-sm text-[#6C7994] space-y-2 pt-4 border-t border-gray-700">
                  <p>• Payment via OVO only</p>
                  <p>• Verification within 1-2 hours</p>
                  <p>• Project starts after payment confirmation</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
