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
                  Project timelines vary based on complexity. Frontend projects typically take 1-3 weeks, while
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
                <span className="text-xl font-bold">Development</span>
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
            <h5 className="font-semibold mb-4">Follow Us</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                target="_blank"
                  href="https://www.instagram.com/fadjri_w/"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @fadjri.w
                </a>
              </li>
              <li>
                <a
                target="_blank"
                  href="https://github.com/onlymeknow88"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                    target="_blank"
                  href="https://www.linkedin.com/in/fadjri-wivindi-7a3387211"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
              {/* <li>
                <a
                  href="https://wa.me/6285391000900"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                  </svg>
                  WhatsApp
                </a>
              </li> */}
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