"use client";

import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  Code,
  Database,
  Globe,
  Palette,
  Server,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
} from "@heroui/react";

import Link from "next/link";
import type React from "react";
import ResponsiveNavbar from "./components/navbar";

interface ServiceDetail {
  id: string;
  name: string;
  baseHours: number;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  features: string[];
  technologies: string[];
  deliverables: string[];
  timeline: string;
  complexity: "Simple" | "Medium" | "Complex" | "Enterprise";
  category: "Development" | "Design" | "Marketing";
  popular?: boolean;
  basePrice: number;
}

export default function FreelanceRateCalculator() {
  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const services: ServiceDetail[] = [
    {
      id: "frontend",
      name: "Frontend Development",
      baseHours: 120,
      description: "Responsive web design with modern frameworks",
      longDescription:
        "Create stunning, responsive user interfaces using the latest frontend technologies. We build fast, accessible, and SEO-optimized websites that work perfectly across all devices and browsers.",
      icon: <Code className="h-8 w-8" />,
      features: [
        "Responsive Design",
        "Cross-browser Compatibility",
        "Accessibility Standards",
        "Mobile-first Approach",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "JavaScript",
      ],
      deliverables: [
        "Fully responsive website",
        "Deployment & hosting setup",
        "Landing Page Company Profile",
        "UI/UX Design",
      ],
      timeline: "1-3 weeks",
      complexity: "Medium",
      category: "Development",
      basePrice: 6000000, // 120 hours × 50k = 15 hari kerja
    },
   
    {
      id: "laravel-fullstack",
      name: "Laravel Full Stack Development",
      baseHours: 220,
      description: "Complete Laravel web application with CMS",
      longDescription:
        "Professional full-stack web application development using Laravel, Inertia.js, and React. Build robust, scalable applications with integrated content management system and modern frontend experience.",
      icon: <Database className="h-8 w-8" />,
      features: [
        "Laravel Backend Framework",
        "Inertia.js Integration",
        "React Frontend Components",
        "Content Management System",
        "User Authentication & Authorization",
        "Admin Dashboard",
        "Database Design & Migration",
        "API Development",
        "File Upload Management",
        "Security Implementation",
        "Performance Optimization",
        "SEO-friendly Structure",
        "Responsive Design",
        "Multi-language Support",
      ],
      technologies: [
        "Laravel",
        "Inertia.js",
        "React",
        "PHP",
        "MySQL",
        "TypeScript",
        "Tailwind CSS",
        "Vite",
        "Composer",
        "Artisan CLI",
      ],
      deliverables: [
        "Complete Laravel application",
        "Custom CMS interface",
        "Admin panel with full CRUD operations",
        "User management system",
        "Database with seeded data",
        "API documentation",
        "Deployment guide",
        // "Source code with documentation",
      ],
      timeline: "4-6 weeks",
      complexity: "Complex",
      category: "Development",
      popular: true,
      basePrice: 11000000, // 220 hours × 50k = 27.5 hari kerja
    },
     {
      id: "fullstack",
      name: "Full Stack Development",
      baseHours: 320,
      description: "Complete web application development",
      longDescription:
        "End-to-end web application development combining beautiful frontend interfaces with powerful backend systems. Get a complete solution from database to user interface.",
      icon: <Database className="h-8 w-8" />,
      features: [
        "Complete Web Application",
        "Frontend + Backend Integration",
        "Database Management",
        "User Authentication",
        "Admin Dashboard",
        "API Integration",
        "Security Implementation",
        "Performance Optimization",
        "UI/UX Design",
        "Company Profile",
        "Real-time Features",
      ],
      technologies: [
        "React",
        "Node.js",
        "Next.js",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
        "Stripe",
        "Vercel",
      ],
      deliverables: [
        "Complete web application",
        "Admin panel/dashboard",
        "Deployment & hosting setup",
      ],
      timeline: "6-8 weeks",
      complexity: "Complex",
      category: "Development",
      popular: false,
      basePrice: 16000000, // 320 hours × 50k = 40 hari kerja
    },
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Simple":
        return "success";
      case "Medium":
        return "primary";
      case "Complex":
        return "warning";
      case "Enterprise":
        return "danger";
      default:
        return "default";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Development":
        return <Code className="h-4 w-4" />;
      case "Design":
        return <Palette className="h-4 w-4" />;
      case "Marketing":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F]">
      {/* Header */}
      <ResponsiveNavbar />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[#6C7994] mb-6">
            Our Professional
            <span className="text-[#CCD6F6]"> Services</span>
          </h2>
          <p className="text-xl text-[#6C7994] mb-8 max-w-3xl mx-auto">
            Services for web development, mobile apps, and digital solutions.
            From concept to deployment, we deliver high-quality results with
            transparent pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link href="/">
              <Button size="lg" color="primary" className="font-semibold">
                Calculate Project Cost
              </Button>
            </Link> */}
            <a
            
              href="#services"
            >
            <Button
            // as={Link}
            size="lg"
            variant="bordered"
            className="font-semibold border-[#59E2C5] text-[#59E2C5] hover:bg-[#59E2C5] hover:text-white"
            >
              View All Services
            </Button>
                </a>
          </div>
        </div>
      </section>

      {/* Services Overview Stats */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">6+</div>
              <div className="text-gray-600">Service Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">100+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">50K-500K</div>
              <div className="text-gray-600">Hourly Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Services Grid */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-[#CCD6F6] mb-4">
              Our Services
            </h3>
            <p className="text-xl text-[#6C7994]">
              Professional development services with detailed specifications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`relative bg-[#112240] p-4 sm:p-6 lg:p-[30px] ${
                  service.popular ? "ring-2 ring-green-500" : ""
                }`}
              >
                {service.popular && (
                  <Chip
                    color="success"
                    variant="solid"
                    className="absolute -top-2 left-4 sm:left-6 z-10 text-xs sm:text-sm"
                    startContent={<Star className="h-3 w-3" />}
                  >
                    Most Popular
                  </Chip>
                )}

                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex flex-col justify-between w-full">
                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full gap-4 sm:gap-0">
                      <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                        <div className="text-[#A6B0D0] flex-shrink-0">
                          {service.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                            {service.name}
                          </h4>
                          <p className="text-sm sm:text-base text-[#6C7994] mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Price section - centered on mobile, right-aligned on desktop */}
                      <div className="text-center sm:text-right flex-shrink-0">
                        <div className="text-xl sm:text-2xl font-bold text-[#59E2C5]">
                          {formatRupiah(service.basePrice)}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          Starting from
                        </div>
                      </div>
                    </div>

                    {/* Chips - responsive grid */}
                    <div className="flex flex-wrap items-start gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                      <Chip
                        variant="flat"
                        color="success"
                        className="text-[#59E2C5] text-xs sm:text-sm"
                        size="sm"
                      >
                        {service.complexity}
                      </Chip>
                      <Chip
                        variant="flat"
                        color="success"
                        className="text-[#59E2C5] text-xs sm:text-sm"
                        size="sm"
                      >
                        {service.category}
                      </Chip>
                      <Chip
                        variant="flat"
                        color="success"
                        className="text-[#59E2C5] text-xs sm:text-sm"
                        size="sm"
                      >
                        {service.baseHours}h base
                      </Chip>
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="space-y-4 sm:space-y-5 lg:space-y-6">
                  {/* Long Description */}
                  <p className="text-sm sm:text-base text-[#6C7994] leading-relaxed">
                    {service.longDescription}
                  </p>

                  {/* Key Features */}
                  <div>
                    <h5 className="font-semibold mb-2 sm:mb-3 flex items-center text-white text-sm sm:text-base">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Key Features
                    </h5>
                    {/* Responsive grid - 1 column on mobile, 2 on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      {service.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start text-xs sm:text-sm text-white"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Divider />

                  {/* Technologies */}
                  <div>
                    <h5 className="font-semibold mb-2 sm:mb-3 flex items-center text-white text-sm sm:text-base">
                      <Zap className="h-4 w-4 text-blue-500 mr-2" />
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {service.technologies.map((tech, index) => (
                        <Chip
                          key={index}
                          size="sm"
                          variant="flat"
                          color="success"
                          className="text-[#59E2C5] text-xs"
                        >
                          {tech}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <Divider />

                  {/* Deliverables */}
                  <div>
                    <h5 className="font-semibold mb-2 sm:mb-3 flex items-center text-white text-sm sm:text-base">
                      <Shield className="h-4 w-4 text-purple-500 mr-2" />
                      What You Get
                    </h5>
                    <ul className="space-y-1">
                      {service.deliverables.map((deliverable, index) => (
                        <li
                          key={index}
                          className="flex items-start text-xs sm:text-sm text-white"
                        >
                          <ArrowRight className="h-3 w-3 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Divider />

                  {/* Timeline & Action - responsive layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center text-xs sm:text-sm text-white">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>Timeline: {service.timeline}</span>
                    </div>
                    <Link href={`/checkout?service=${service.id}`}>
                      <Button
                        className="border-[#59E2C5] text-[#59E2C5] hover:bg-[#59E2C5] hover:text-white w-full sm:w-auto"
                        variant="bordered"
                        size="md"
                      >
                        Order Now
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-[#CCD6F6] mb-4">
              Our Development Process
            </h3>
            <p className="text-xl text-[#6C7994]">
              Structured approach to deliver quality results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="bg-[#112240]">
              <CardBody className="text-center p-6">
                <div className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[#59E2C5]" />
                </div>
                <h4 className="font-semibold mb-2 text-white">
                  1. Consultation
                </h4>
                <p className="text-sm text-gray-400">
                  Understand your requirements and project goals through
                  detailed discussion
                </p>
              </CardBody>
            </Card>

            <Card className="bg-[#112240]">
              <CardBody className="text-center p-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-[#59E2C5]" />
                </div>
                <h4 className="font-semibold mb-2 text-white">2. Planning</h4>
                <p className="text-sm text-gray-400">
                  Create detailed project plan, timeline, and technical
                  specifications
                </p>
              </CardBody>
            </Card>

            <Card className="bg-[#112240]">
              <CardBody className="text-center p-6">
                <div className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-[#59E2C5]" />
                </div>
                <h4 className="font-semibold mb-2 text-white">
                  3. Development
                </h4>
                <p className="text-sm text-gray-400">
                  Build your project with regular updates and milestone reviews
                </p>
              </CardBody>
            </Card>

            <Card className="bg-[#112240]">
              <CardBody className="text-center p-6">
                <div className=" w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#59E2C5]" />
                </div>
                <h4 className="font-semibold mb-2 text-white">4. Delivery</h4>
                <p className="text-sm text-gray-400">
                  Testing, deployment, and handover with documentation and
                  support
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-[#0A192F] text-white border-none" shadow="none">
            <CardBody className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Get a detailed quote for your project with professional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <Link href="/">
                  <Button size="lg" color="default" className="font-semibold">
                    Calculate Project Cost
                  </Button>
                </Link> */}
                <Link href={`/contact`}>
                  <Button
                    size="lg"
                    variant="bordered"
                    className="font-semibold border-[#59E2C5] text-[#59E2C5] hover:bg-[#59E2C5] hover:text-white"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
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
                Professional development services with transparent pricing and
                quality results.
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
                  href="https://gitlab.com/fadjri.w"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z" />
                  </svg>
                  GitLab
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
          <Divider className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 FW Development. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
