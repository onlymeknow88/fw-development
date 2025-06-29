"use client"

import { Building, Clock, Globe, Mail, MapPin, MessageCircle, Phone, Send, ShoppingCart, User } from "lucide-react"
import { Button, Card, CardBody, CardHeader, Image, Input, Textarea } from "@heroui/react"

import Link from "next/link"
import type React from "react"
import ResponsiveNavbar from "../components/navbar"
import axios from "axios"
import { useState } from "react"

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Using axios instead of fetch
      const response = await axios.post("/api/contact", contactForm, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      })

      setSubmitStatus({
        type: "success",
        message: response.data.message || "Message sent successfully! We'll get back to you within 24 hours.",
      })

      // Reset form
      setContactForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Contact form error:", error)

      if (axios.isAxiosError(error)) {
        // Handle axios-specific errors
        if (error.response) {
          // Server responded with error status
          setSubmitStatus({
            type: "error",
            message: error.response.data?.error || "Failed to send message. Please try again.",
          })
        } else if (error.request) {
          // Request was made but no response received
          setSubmitStatus({
            type: "error",
            message: "Network error. Please check your connection and try again.",
          })
        } else {
          // Something else happened
          setSubmitStatus({
            type: "error",
            message: "An unexpected error occurred. Please try again.",
          })
        }
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

  return (
    <div className="min-h-screen bg-[#0A192F]">
      {/* Header */}
<ResponsiveNavbar/>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[#6C7994] mb-6">
            Get In
            <span className="text-[#CCD6F6]"> Touch</span>
          </h2>
          <p className="text-xl text-[#6C7994] mb-8 max-w-3xl mx-auto">
            {/* @ts-ignore */}
            Ready to start your project? Have questions about our services? We&apos;d love to hear from you. Let&apos;s discuss
            how we can help bring your ideas to life.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Details */}
            <Card className="bg-[#112240]">
              <CardHeader>
                <h3 className="text-xl font-bold text-white flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-[#59E2C5]" />
                  Contact Information
                </h3>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#59E2C5]/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-[#59E2C5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p className="text-[#6C7994]">fadjri.w@gmail.com</p>
                    <p className="text-sm text-gray-500">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#59E2C5]/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-[#59E2C5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Phone</h4>
                    <p className="text-[#6C7994]">+62 853-91000-900</p>
                    <p className="text-sm text-gray-500">Available 9 AM - 6 PM (GMT+8)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#59E2C5]/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-[#59E2C5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Location</h4>
                    <p className="text-[#6C7994]">Balikpapan, Indonesia</p>
                    <p className="text-sm text-gray-500">Remote work available worldwide</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#59E2C5]/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-[#59E2C5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Business Hours</h4>
                    <p className="text-[#6C7994]">Monday - Friday: 9 AM - 6 PM</p>
                    <p className="text-[#6C7994]">Saturday: 9 AM - 2 PM</p>
                    <p className="text-sm text-gray-500">GMT+8 (Indonesia Time)</p>
                  </div>
                </div>
              </CardBody>
            </Card>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-[#112240]">
              <CardHeader>
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Send className="h-5 w-5 mr-2 text-[#59E2C5]" />
                  Send us a Message
                </h3>
              </CardHeader>
              <CardBody>
                {/* Status Message */}
                {submitStatus.type && (
                  <div
                    className={`mb-6 p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      variant="bordered"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      startContent={<User className="h-4 w-4 text-gray-400" />}
                      classNames={{
                              label: "!text-white",
                              //   base: "bg-red-400",
                              //behind the input
                              inputWrapper: "!border-[#A6B0D0]",
                              input: ["text-white"],
                            }}
                      required
                    />
                    <Input
                      label="Email Address"
                      placeholder="Enter your email"
                      type="email"
                      variant="bordered"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      startContent={<Mail className="h-4 w-4 text-gray-400" />}
                      classNames={{
                              label: "!text-white",
                              //   base: "bg-red-400",
                              //behind the input
                              inputWrapper: "!border-[#A6B0D0]",
                              input: ["text-white"],
                            }}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      variant="bordered"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      startContent={<Phone className="h-4 w-4 text-gray-400" />}
                      classNames={{
                              label: "!text-white",
                              //   base: "bg-red-400",
                              //behind the input
                              inputWrapper: "!border-[#A6B0D0]",
                              input: ["text-white"],
                            }}
                    />
                    <Input
                      label="Company (Optional)"
                      placeholder="Enter your company name"
                      variant="bordered"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      startContent={<Building className="h-4 w-4 text-gray-400" />}
                      classNames={{
                              label: "!text-white",
                              //   base: "bg-red-400",
                              //behind the input
                              inputWrapper: "!border-[#A6B0D0]",
                              input: ["text-white"],
                            }}
                    />
                  </div>

                  <Input
                    label="Subject"
                    placeholder="What's this about?"
                    variant="bordered"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    classNames={{
                              label: "!text-white",
                              //   base: "bg-red-400",
                              //behind the input
                              inputWrapper: "!border-[#A6B0D0]",
                              input: ["text-white"],
                            }}
                    required
                  />

                  <Textarea
                    label="Message"
                    placeholder="Tell us about your project or ask any questions..."
                    variant="bordered"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    minRows={6}
                    classNames={{
                              label: "!text-white",
                              //   base: "bg-red-400",
                              //behind the input
                              inputWrapper: "!border-[#A6B0D0]",
                              input: ["text-white"],
                            }}
                    required
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="bg-[#59E2C5] text-white font-semibold flex-1"
                      size="lg"
                      isLoading={isSubmitting}
                      startContent={!isSubmitting && <Send className="h-4 w-4" />}
                      isDisabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    <Button
                      type="button"
                      variant="bordered"
                      className="border-gray-600 text-white hover:border-[#59E2C5] hover:text-[#59E2C5]"
                      size="lg"
                      onClick={() => {
                        setContactForm({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          subject: "",
                          message: "",
                        })
                        setSubmitStatus({ type: null, message: "" })
                      }}
                      isDisabled={isSubmitting}
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#112240]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-[#CCD6F6] mb-4">Frequently Asked Questions</h3>
            <p className="text-xl text-[#6C7994]">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[#112240]">
              <CardBody className="p-6">
                <h4 className="font-semibold text-white mb-2">How long does a typical project take?</h4>
                <p className="text-[#6C7994] text-sm">
                  Project timelines vary based on complexity. Frontend projects typically take 3-5 weeks, while
                  full-stack applications can take 6-8 weeks. We&apos;ll provide a detailed timeline during consultation.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-[#112240]">
              <CardBody className="p-6">
                <h4 className="font-semibold text-white mb-2">What&apos;s your payment structure?</h4>
                <p className="text-[#6C7994] text-sm">
                  We require 50% down payment to start the project and 50% upon completion. We accept bank transfers and
                  e-wallet payments.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-[#112240]">
              <CardBody className="p-6">
                <h4 className="font-semibold text-white mb-2">Do you provide ongoing support?</h4>
                <p className="text-[#6C7994] text-sm">
                  Yes! We offer maintenance packages that include bug fixes, updates, and technical support. Our 3-month
                  maintenance package is popular among clients.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-[#112240]">
              <CardBody className="p-6">
                <h4 className="font-semibold text-white mb-2">Can you work with international clients?</h4>
                <p className="text-[#6C7994] text-sm">
                  We work with clients worldwide and are experienced in remote collaboration. We adjust our
                  communication schedule to accommodate different time zones.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/logo.png" alt="logo" className="h-6 w-6" />
                <span className="text-xl font-bold">FW Development</span>
              </div>
              <p className="text-gray-400">
                Professional development services with transparent pricing and quality results.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Frontend Development</li>
                <li>Backend Development</li>
                <li>Full Stack Development</li>
                <li>Mobile App Development</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Technologies</h5>
              <ul className="space-y-2 text-gray-400">
                <li>React & Next.js</li>
                <li>Node.js & Express</li>
                <li>React Native</li>
                <li>PostgreSQL & MongoDB</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>fadjri.w@gmail.com</li>
                <li>+62 853-91000-900</li>
                <li>Balikpapan, Indonesia</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FW Development. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}