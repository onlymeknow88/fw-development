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
        // "Performance Optimization",
        // "SEO-friendly Structure",
        "Accessibility Standards",
        // "Modern UI/UX",
        // "Interactive Components",
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
        // "Source code documentation",
        // "Browser compatibility report",
        // "Performance optimization report",
        // "Deployment guide",
      ],
      timeline: "1-3 weeks",
      complexity: "Medium",
      category: "Development",
      basePrice: 6000000, // 40 hours × 150k
    },
    // {
    //   id: "backend",
    //   name: "Backend Development",
    //   baseHours: 60,
    //   description: "Server-side logic, APIs, and database integration",
    //   longDescription:
    //     "Build robust, scalable backend systems with secure APIs, efficient databases, and reliable server architecture. Perfect for web applications that need powerful server-side functionality.",
    //   icon: <Server className="h-8 w-8" />,
    //   features: [
    //     "RESTful API Development",
    //     "Database Design & Integration",
    //     "Authentication & Authorization",
    //     "Security Implementation",
    //     "Performance Optimization",
    //     "Third-party Integrations",
    //     "Error Handling & Logging",
    //     "Scalable Architecture",
    //   ],
    //   technologies: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redis", "JWT", "Docker", "AWS"],
    //   deliverables: [
    //     "Complete API documentation",
    //     "Database schema design",
    //     "Security audit report",
    //     "Performance benchmarks",
    //     "Deployment configuration",
    //   ],
    //   timeline: "3-4 weeks",
    //   complexity: "Complex",
    //   category: "Development",
    //   popular: true,
    //   basePrice: 9000000, // 60 hours × 200k
    // },
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
        // "Payment Integration",
        "Real-time Features",
        // "Cloud Deployment",
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
        // "User documentation",
        // "Technical documentation",
        "Deployment & hosting setup",
      ],
      timeline: "6-8 weeks",
      complexity: "Complex",
      category: "Development",
      popular: true,
      basePrice: 16000000, // 60 hours × 200k
    },
    // {
    //   id: "uiux",
    //   name: "UI/UX Design",
    //   baseHours: 30,
    //   description: "User interface and experience design",
    //   longDescription:
    //     "Create intuitive, beautiful user experiences with modern design principles. From wireframes to high-fidelity prototypes, we design interfaces that users love.",
    //   icon: <Palette className="h-8 w-8" />,
    //   features: [
    //     "User Research & Analysis",
    //     "Wireframing & Prototyping",
    //     "Visual Design System",
    //     "Interactive Prototypes",
    //     "Usability Testing",
    //     "Responsive Design",
    //     "Brand Integration",
    //     "Design Handoff",
    //   ],
    //   technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Framer", "Miro", "Photoshop"],
    //   deliverables: [
    //     "Design system & style guide",
    //     "High-fidelity mockups",
    //     "Interactive prototypes",
    //     "User flow diagrams",
    //     "Design specifications",
    //   ],
    //   timeline: "2-3 weeks",
    //   complexity: "Medium",
    //   category: "Design",
    //   basePrice: 4500000, // 30 hours × 150k
    // },
    // {
    //   id: "mobile",
    //   name: "Mobile App Development",
    //   baseHours: 100,
    //   description: "iOS and Android application development",
    //   longDescription:
    //     "Build native-quality mobile applications for iOS and Android platforms. Cross-platform development ensures your app works perfectly on all devices while maintaining native performance.",
    //   icon: <Smartphone className="h-8 w-8" />,
    //   features: [
    //     "Cross-platform Development",
    //     "Native Performance",
    //     "Push Notifications",
    //     "Offline Functionality",
    //     "App Store Optimization",
    //     "In-app Purchases",
    //     "Social Media Integration",
    //     "Analytics Integration",
    //   ],
    //   technologies: ["React Native", "Flutter", "Expo", "Firebase", "Redux", "TypeScript", "Native APIs"],
    //   deliverables: [
    //     "iOS & Android apps",
    //     "App store submissions",
    //     "User manual",
    //     "Technical documentation",
    //     "Analytics setup",
    //   ],
    //   timeline: "6-8 weeks",
    //   complexity: "Enterprise",
    //   category: "Development",
    //   basePrice: 15000000, // 100 hours × 150k
    // },
    // {
    //   id: "ecommerce",
    //   name: "E-commerce Development",
    //   baseHours: 120,
    //   description: "Online store with payment integration",
    //   longDescription:
    //     "Complete e-commerce solutions with secure payment processing, inventory management, and customer analytics. Build your online business with professional e-commerce platforms.",
    //   icon: <TrendingUp className="h-8 w-8" />,
    //   features: [
    //     "Product Catalog Management",
    //     "Shopping Cart & Checkout",
    //     "Payment Gateway Integration",
    //     "Order Management System",
    //     "Inventory Tracking",
    //     "Customer Accounts",
    //     "Analytics & Reporting",
    //     "SEO Optimization",
    //   ],
    //   technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal", "Next.js", "Sanity CMS", "Google Analytics"],
    //   deliverables: [
    //     "Complete online store",
    //     "Payment system setup",
    //     "Admin dashboard",
    //     "Analytics configuration",
    //     "SEO optimization",
    //   ],
    //   timeline: "6-10 weeks",
    //   complexity: "Enterprise",
    //   category: "Development",
    //   popular: true,
    //   basePrice: 18000000, // 120 hours × 150k
    // },
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
            <Button
              size="lg"
              variant="bordered"
              className="font-semibold border-[#59E2C5] text-[#59E2C5] hover:bg-[#59E2C5] hover:text-white"
              href="#services"
            >
              View All Services
            </Button>
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
                <span className="text-xl font-bold">FW Development</span>
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
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>fadjri.w@gmail.com</li>
                <li>+62 853-91000-900</li>
                <li>Balikpapan, Indonesia</li>
                <li>Available 24/7</li>
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
