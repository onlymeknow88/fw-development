"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  Image,
  Input,
  Textarea,
} from "@heroui/react";
import {
  Code,
  CreditCard,
  Database,
  Globe,
  Mail,
  MapPin,
  Package,
  Palette,
  Phone,
  Server,
  Shield,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import type React from "react";
import ResponsiveNavbar from "../components/navbar";

// import { Router } from "next/router"

interface ServiceDetail {
  id: string;
  name: string;
  baseHours: number;
  description: string;
  icon: React.ReactNode;
  basePrice: number;
  complexity: "Simple" | "Medium" | "Complex" | "Enterprise";
  category: "Development" | "Design" | "Marketing";
}

interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

const services: ServiceDetail[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    baseHours: 120,
    description: "Responsive web design with modern frameworks",
    icon: <Code className="h-6 w-6" />,
    basePrice: 6000000,
    complexity: "Medium",
    category: "Development",
  },
  {
    id: "fullstack",
    name: "Full Stack Development",
    baseHours: 320,
    description: "Complete web application development",
    icon: <Database className="h-6 w-6" />,
    basePrice: 16000000,
    complexity: "Complex",
    category: "Development",
  },
  //   {
  //     id: "backend",
  //     name: "Backend Development",
  //     baseHours: 60,
  //     description: "Server-side logic, APIs, and database integration",
  //     icon: <Server className="h-6 w-6" />,
  //     basePrice: 9000000,
  //     complexity: "Complex",
  //     category: "Development",
  //   },
  //   {
  //     id: "mobile",
  //     name: "Mobile App Development",
  //     baseHours: 100,
  //     description: "iOS and Android application development",
  //     icon: <Smartphone className="h-6 w-6" />,
  //     basePrice: 15000000,
  //     complexity: "Enterprise",
  //     category: "Development",
  //   },
  //   {
  //     id: "uiux",
  //     name: "UI/UX Design",
  //     baseHours: 30,
  //     description: "User interface and experience design",
  //     icon: <Palette className="h-6 w-6" />,
  //     basePrice: 4500000,
  //     complexity: "Medium",
  //     category: "Design",
  //   },
  //   {
  //     id: "ecommerce",
  //     name: "E-commerce Development",
  //     baseHours: 120,
  //     description: "Online store with payment integration",
  //     icon: <TrendingUp className="h-6 w-6" />,
  //     basePrice: 18000000,
  //     complexity: "Enterprise",
  //     category: "Development",
  //   },
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    projectDescription: "",
    domainName: "", // Add this line
  });

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    console.log("Service param:", serviceParam); // Debug log

    if (serviceParam) {
      const foundService = services.find((s) => s.id === serviceParam);
      console.log("Found service:", foundService); // Debug log

      if (foundService) {
        setSelectedServices([serviceParam]);
        console.log("Service auto-selected:", serviceParam); // Debug log
      }
    }
  }, [searchParams]);

  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const addOnServices: AddOnService[] = [
    {
      id: "domain",
      name: "Domain Registration",
      description: "Professional domain name registration (.com, .id, .co.id)",
      price: 300000,
      icon: <Globe className="h-5 w-5" />,
    },
    {
      id: "hosting",
      name: "Web Hosting (1 Year)",
      description:
        "Reliable web hosting with SSL certificate and daily backups",
      price: 1000000,
      icon: <Server className="h-5 w-5" />,
    },
    // {
    //   id: "email",
    //   name: "Email Domain (1 Year)",
    //   description:
    //     "Professional email domain registration and email forwarding",
    //   price: 500000,
    //   icon: <Mail className="h-5 w-5" />,
    // },
    // {
    //   id: "maintenance",
    //   name: "Maintenance Package (3 Months)",
    //   description: "Bug fixes, updates, and technical support for 3 months",
    //   price: 1500000,
    //   icon: <Shield className="h-5 w-5" />,
    // },
    // {
    //   id: "seo",
    //   name: "SEO Optimization",
    //   description: "Search engine optimization and Google Analytics setup",
    //   price: 2000000,
    //   icon: <TrendingUp className="h-5 w-5" />,
    // },
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return total + (service?.basePrice || 0);
    }, 0);

    const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOnServices.find((a) => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);

    return servicesTotal + addOnsTotal;
  };

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

  const handleProceedToPayment = () => {
    if (selectedServices.length === 0) return;

    // Validate required customer information
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert("Please fill in your name, email, and phone number to proceed.");
      return;
    }

    // Prepare detailed order data
    const orderData = {
      services: selectedServices.map((serviceId) => {
        const service = services.find((s) => s.id == serviceId);
        return {
          id: serviceId,
          name: service?.name || serviceId,
          price: service?.basePrice || 0,
          hours: service?.baseHours || 0,
        };
      }),
      addOns: selectedAddOns.map((addOnId) => {
        const addOn = addOnServices.find((a) => a.id === addOnId);
        return {
          id: addOnId,
          name: addOn?.name || addOnId,
          price: addOn?.price || 0,
        };
      }),
      customerInfo: {
        ...customerInfo,
        domainName: selectedAddOns.includes("domain")
          ? customerInfo.domainName
          : "",
      },
      total: calculateTotal(),
      orderId: `FW${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };

    // Navigate to payment page with order data
    const orderDataParam = encodeURIComponent(JSON.stringify(orderData));
    router.push(`/payment?orderData=${orderDataParam}`);
  };

  return (
    <div className="min-h-screen bg-[#0A192F]">
      {/* Header */}
       <ResponsiveNavbar cartItemCount={selectedServices.length + selectedAddOns.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#CCD6F6] mb-2">
            Order Checkout
          </h2>
          <p className="text-[#6C7994]">
            Select your services and complete your order
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Service Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services Selection */}
            <Card className="bg-[#112240]">
              <CardHeader>
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Package className="h-5 w-5 mr-2 text-[#59E2C5]" />
                  Select Services
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="border border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        isSelected={selectedServices.includes(service.id)}
                        onValueChange={() => handleServiceToggle(service.id)}
                        color="success"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex lg:flex-row flex-col lg:items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-[#A6B0D0]">{service.icon}</div>
                            <div>
                              <h4 className="font-semibold text-white">
                                {service.name}
                              </h4>
                              <p className="text-sm text-[#6C7994]">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-[#59E2C5]">
                              {formatRupiah(service.basePrice)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {service.baseHours}h base
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Chip
                            size="sm"
                            variant="flat"
                            color="success"
                            className="text-[#59E2C5]"
                          >
                            {service.complexity}
                          </Chip>
                          <Chip
                            size="sm"
                            variant="flat"
                            color="success"
                            className="text-[#59E2C5]"
                          >
                            {service.category}
                          </Chip>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>

            {/* Add-on Services */}
            <Card className="bg-[#112240]">
              <CardHeader>
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-[#59E2C5]" />
                  Additional Services
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                {addOnServices.map((addOn) => (
                  <div
                    key={addOn.id}
                    className="border border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        isSelected={selectedAddOns.includes(addOn.id)}
                        onValueChange={() => handleAddOnToggle(addOn.id)}
                        color="success"
                        className="mt-1"
                      />
                      <div className="flex-1">
                       <div className="flex lg:flex-row flex-col lg:items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-[#A6B0D0]">{addOn.icon}</div>
                            <div>
                              <h4 className="font-semibold text-white">
                                {addOn.name}
                              </h4>
                              <p className="text-sm text-[#6C7994]">
                                {addOn.description}
                              </p>
                            </div>
                          </div>
                          <div className="font-bold text-lg text-right text-[#59E2C5]">
                            {formatRupiah(addOn.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Add this right after the domain checkbox div and before the next addOn.map iteration */}
                    {addOn.id === "domain" &&
                      selectedAddOns.includes("domain") && (
                        <div className="mt-3 ml-8">
                          <Input
                            label="Domain Name"
                            placeholder="Enter your desired domain name (e.g., mywebsite.com)"
                            variant="bordered"
                            value={customerInfo.domainName}
                            onChange={(e) =>
                              setCustomerInfo({
                                ...customerInfo,
                                domainName: e.target.value,
                              })
                            }
                            startContent={
                              <Globe className="h-4 w-4 text-gray-400" />
                            }
                            classNames={{
                              label: "!text-white",
                              //   base: "bg-red-400",
                              //behind the input
                              inputWrapper: "!border-[#A6B0D0]",
                              input: ["text-white"],
                            }}
                            description="We'll check availability and suggest alternatives if needed"
                          />
                        </div>
                      )}
                  </div>
                ))}
              </CardBody>
            </Card>

            {/* Customer Information */}
            <Card className="bg-[#112240]">
              <CardHeader>
                <h3 className="text-xl font-bold text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-[#59E2C5]" />
                  Customer Information
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    variant="bordered"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    startContent={<User className="h-4 w-4 text-gray-400" />}
                    classNames={{
                      label: "!text-white",
                      //   base: "bg-red-400",
                      //behind the input
                      inputWrapper: "!border-[#A6B0D0]",
                      input: ["text-white"],
                    }}
                  />
                  <Input
                    variant="bordered"
                    label="Email Address"
                    placeholder="Enter your email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      })
                    }
                    startContent={<Mail className="h-4 w-4 text-gray-400" />}
                    classNames={{
                      label: "!text-white",
                      //   base: "bg-red-400",
                      //behind the input
                      inputWrapper: "!border-[#A6B0D0]",
                      input: ["text-white"],
                    }}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    variant="bordered"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        phone: e.target.value,
                      })
                    }
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
                    variant="bordered"
                    label="Company (Optional)"
                    placeholder="Enter your company name"
                    value={customerInfo.company}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        company: e.target.value,
                      })
                    }
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
                  variant="bordered"
                  label="Address"
                  placeholder="Enter your address"
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      address: e.target.value,
                    })
                  }
                  startContent={<MapPin className="h-4 w-4 text-gray-400" />}
                  classNames={{
                    label: "!text-white",
                    //   base: "bg-red-400",
                    //behind the input
                    inputWrapper: "!border-[#A6B0D0]",
                    input: ["text-white"],
                  }}
                />
                <Textarea
                  variant="bordered"
                  label="Project Description"
                  placeholder="Describe your project requirements..."
                  value={customerInfo.projectDescription}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      projectDescription: e.target.value,
                    })
                  }
                  classNames={{
                    label: "!text-white",
                    //   base: "bg-red-400",
                    //behind the input
                    inputWrapper: "!border-[#A6B0D0]",
                    input: ["text-white"],
                  }}
                />
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-[#112240] sticky top-8">
              <CardHeader>
                <h3 className="text-xl font-bold text-white flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-[#59E2C5]" />
                  Order Summary
                </h3>
              </CardHeader>
              <CardBody className="space-y-4">
                {/* Selected Services */}
                {selectedServices.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Selected Services:
                    </h4>
                    <div className="space-y-2">
                      {selectedServices.map((serviceId) => {
                        const service = services.find(
                          (s) => s.id === serviceId
                        );
                        return service ? (
                          <div
                            key={serviceId}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-[#6C7994]">
                              {service.name}
                            </span>
                            <span className="text-white">
                              {formatRupiah(service.basePrice)}
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Selected Add-ons */}
                {selectedAddOns.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Additional Services:
                    </h4>
                    <div className="space-y-2">
                      {selectedAddOns.map((addOnId) => {
                        const addOn = addOnServices.find(
                          (a) => a.id === addOnId
                        );
                        return addOn ? (
                          <div
                            key={addOnId}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-[#6C7994]">{addOn.name}</span>
                            <span className="text-white">
                              {formatRupiah(addOn.price)}
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {(selectedServices.length > 0 || selectedAddOns.length > 0) && (
                  <Divider />
                )}

                {/* Total */}
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-[#59E2C5]">
                    {formatRupiah(calculateTotal())}
                  </span>
                </div>

                <Divider />

                {/* Payment Info */}
                <div className="text-sm text-[#6C7994] space-y-2">
                  <p>• 50% down payment required to start</p>
                  <p>• Remaining 50% upon project completion</p>
                  <p>• Payment via bank transfer or e-wallet</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full border-[#59E2C5] text-[#59E2C5] hover:bg-[#59E2C5] hover:text-black font-semibold"
                    size="lg"
                    variant="bordered"
                    isDisabled={
                      selectedServices.length === 0 ||
                      !customerInfo.name ||
                      !customerInfo.email ||
                      !customerInfo.phone
                    }
                    onClick={handleProceedToPayment}
                  >
                    Proceed to Payment
                  </Button>
                  {/* <Button variant="bordered" className="w-full border-[#59E2C5] text-[#59E2C5]" size="lg">
                    Save as Draft
                  </Button> */}
                </div>

                {/* Contact Info */}
                <div className="text-center text-sm text-[#6C7994] pt-4 border-t border-gray-700">
                  <p>Need help? Contact us:</p>
                  <p className="text-[#59E2C5]">fadjri.w@gmail.com</p>
                  <p className="text-[#59E2C5]">+62 853-91000-900</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
