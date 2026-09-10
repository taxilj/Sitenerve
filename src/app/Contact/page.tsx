'use client';
import { Suspense, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import emailjs from "@emailjs/browser";
import { Navbar } from "@/components/Navbar";
import { Connect } from "@/page/Connect";
import { Footer } from "@/page/Footer";
import { ChevronDown, ChevronRight, Check } from "lucide-react";

const contactChannels = [
  {
    label: "Phone / WhatsApp",
    value: "+91 9104980549",
    helper: "Call us 10 AM – 8 PM IST for new engagements.",
  },
  {
    label: "Studio HQ",
    value: "Ahmedabad, Gujarat, India 380001",
    helper: "Drop by with a prior appointment. We're located in the heart of Ahmedabad.",
  },
];

// Available service plans
const servicePlans = [
  // Website Development
  { category: "Website Development", name: "Static Website (3–5 Pages)", price: "₹2,500 – ₹8,000" },
  { category: "Website Development", name: "Business Website", price: "₹8,000 – ₹15,000", popular: true },
  { category: "Website Development", name: "Portfolio / Personal Website", price: "₹4,000 – ₹10,000" },
  { category: "Website Development", name: "Custom Website", price: "₹15,000+" },
  
  // Mobile Apps
  { category: "Mobile App Development", name: "Basic Android App", price: "₹10,000 – ₹20,000", popular: true },
  { category: "Mobile App Development", name: "Business Mobile App", price: "₹20,000 – ₹40,000" },
  { category: "Mobile App Development", name: "Custom App", price: "₹40,000+" },
  
  // Desktop Software
  { category: "Desktop Software", name: "Mini Desktop Tool", price: "₹8,000 – ₹18,000" },
  { category: "Desktop Software", name: "Business Desktop Software", price: "₹20,000 – ₹40,000", popular: true },
  { category: "Desktop Software", name: "Custom Desktop ERP Software", price: "₹60,000+" },
  
  // Redesign
  { category: "Website Redesign", name: "UI Refresh", price: "₹5,000 – ₹12,000" },
  { category: "Website Redesign", name: "Complete Website Redesign", price: "₹12,000 – ₹25,000", popular: true },
  
  // Graphic Design
  { category: "Graphic Design", name: "Logo Design", price: "₹1,500 – ₹5,000" },
  { category: "Graphic Design", name: "Brand Identity Package", price: "₹8,000 – ₹15,000", popular: true },
  { category: "Graphic Design", name: "Marketing Materials", price: "₹2,000 – ₹8,000" },
  
  // Startup Kit
  { category: "Startup Kit", name: "Basic Startup Kit", price: "₹15,000 – ₹25,000", popular: true },
  { category: "Startup Kit", name: "Complete Startup Package", price: "₹30,000 – ₹50,000" },
  
  // White Label
  { category: "White-Label Services", name: "Delivery App Template", price: "₹25,000 – ₹40,000" },
  { category: "White-Label Services", name: "E-commerce Template", price: "₹30,000 – ₹50,000", popular: true },
];

// Hard-coded credentials (as per your details)
const EMAILJS_SERVICE_ID = "service_2vx7i9p";
const EMAILJS_STUDIO_TEMPLATE_ID = "template_8l2cqke";     // Tumhare liye inquiry email
const EMAILJS_THANKYOU_TEMPLATE_ID = "template_pgt5yil";   // Client ko auto thank you
const EMAILJS_PUBLIC_KEY = "OKaD_gWVKz2kbR6Wb";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const seededService = searchParams?.get("service") ?? "";
  
  // Find pre-selected plan from URL params
  const preSelectedPlan = servicePlans.find(plan => 
    plan.name.toLowerCase().includes(seededService.toLowerCase()) ||
    seededService.toLowerCase().includes(plan.name.toLowerCase())
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    selectedPlan: preSelectedPlan || null,
    projectDetails: "",
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useLocomotiveScroll(scrollContainerRef);

  const handleFieldChange =
    (field: keyof Omit<typeof formData, 'selectedPlan'>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      if (status === "success") {
        setStatus("idle");
      }
    };

  const handlePlanSelect = (plan: typeof servicePlans[0]) => {
    setFormData(prev => ({ ...prev, selectedPlan: plan }));
    setIsDropdownOpen(false);
    setExpandedCategory(null);
    if (status === "success") {
      setStatus("idle");
    }
  };

  const handleCategoryToggle = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const safeName = formData.name.trim() || "Unnamed Lead";
    const safeCompany = formData.company.trim() || "Not provided";
    const safePhone = formData.phone.trim() || "Not provided";
    const safeProjectDetails = formData.projectDetails.trim() || "Not provided yet.";
    const selectedPlanText = formData.selectedPlan 
      ? `${formData.selectedPlan.name} (${formData.selectedPlan.price}) - ${formData.selectedPlan.category}`
      : "No plan selected";

    const studioSubject = `New inquiry — ${safeName} | ${selectedPlanText}`;
    const clientSubject = `Thanks ${safeName}! We received your inquiry.`;

    const studioDetails = [
      `Name: ${safeName}`,
      `Email: ${formData.email}`,
      `Company: ${safeCompany}`,
      `Phone: ${safePhone}`,
      `Selected Plan: ${selectedPlanText}`,
      `Project Details: ${safeProjectDetails}`,
    ].join("\n");

    const studioTemplateParams = {
      subject: studioSubject,
      client_name: safeName,
      client_email: formData.email,
      email: formData.email,
      client_company: safeCompany,
      client_phone: safePhone,
      selected_service: selectedPlanText,
      project_details: safeProjectDetails,
      full_details: studioDetails,
    };

    const clientTemplateParams = {
      subject: clientSubject,
      client_name: safeName,
      client_email: formData.email,
      email: formData.email,
      selected_service: selectedPlanText,
      project_details: safeProjectDetails,
    };

    try {
      // Dono emails ek saath bhej rahe hain
      await Promise.all([
        // 1. Studio ko inquiry email
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_STUDIO_TEMPLATE_ID,
          studioTemplateParams,
          EMAILJS_PUBLIC_KEY
        ),
        // 2. Client ko auto thank you email
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_THANKYOU_TEMPLATE_ID,
          clientTemplateParams,
          EMAILJS_PUBLIC_KEY
        ),
      ]);

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        selectedPlan: null,
        projectDetails: "",
      });
    } catch (error) {
      console.error("Failed to send emails via EmailJS:", error);
      setStatus("error");
    }
  };

  // Group plans by category for dropdown
  const groupedPlans = servicePlans.reduce((acc, plan) => {
    if (!acc[plan.category]) {
      acc[plan.category] = [];
    }
    acc[plan.category].push(plan);
    return acc;
  }, {} as Record<string, typeof servicePlans>);

  return (
    <main 
      ref={scrollContainerRef}
      className="relative min-h-screen w-full overflow-x-hidden text-[#212121] font-Neue"
    >
      <div className="relative z-10">
        <Navbar />

        <section className="pt-32 pb-16 px-6 md:px-16 lg:px-24">
          <p className="uppercase text-lg tracking-[0.45em] text-emerald-600 mb-6">
            Contact
          </p>
          <h1 className="text-4xl md:text-8xl font-bold leading-tight max-w-7xl">
            Tell us about the product, brand, or launch you&apos;re planning.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            We collaborate with founders and marketing teams worldwide. Choose the
            channel that works for you and we&apos;ll set up a workshop within 48
            hours.
          </p>
        </section>
        
        <section className="pb-20 px-4 md:px-16 lg:px-24">
          <div className="mx-auto grid gap-6 md:grid-cols-3">
            {contactChannels.map((channel) => (
              <article
                key={channel.label}
                className="group relative overflow-hidden rounded-[28px] border border-emerald-50 bg-gradient-to-br from-white via-white to-emerald-50 p-6 "
              >
                <div className="pl-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.45em] text-emerald-600 mb-3">
                    {channel.label}
                  </p>
                  <p className="text-2xl font-semibold text-[#111] leading-tight break-words">
                    {channel.value}
                  </p>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                    {channel.helper}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        <section id="contact-form" className="pb-20 px-4 md:px-16 lg:px-24">
          <div className="rounded-[36px] border border-white/50 bg-gradient-to-br from-white via-white to-emerald-50 shadow-[0_35px_120px_rgba(15,23,42,0.15)] backdrop-blur-xl p-3 md:p-12 ">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-6 p-6">
                <p className="uppercase text-sm tracking-[0.45em] text-emerald-600">
                  Project Intake
                </p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Share the essentials, and we&apos;ll craft a tailored roadmap in under
                  48 hours.
                </h2>
                <p className="text-lg text-slate-600">
                  We pair your inputs with our pricing intelligence to send you a
                  detailed scope, milestones, and payment schedule. The more context you
                  give, the faster we can start building.
                </p>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3 text-sm text-slate-600">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 font-semibold text-emerald-700">
                      1
                    </span>
                    Choose a service plan that matches your needs and budget.
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3 text-sm text-slate-600">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 font-semibold text-emerald-700">
                      2
                    </span>
                    Tell us about your team, timelines, and success metrics.
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 px-4 py-3 text-sm text-slate-600">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 font-semibold text-emerald-700">
                      3
                    </span>
                    Receive a custom proposal plus a kickoff slot within two days.
                  </div>
                </div>
              </div>
              
              <form
                onSubmit={handleSubmit}
                className="rounded-[28px] border border-white/50 bg-white/65 p-6 md:p-8 space-y-6 shadow-[inset_0_0_30px_rgba(255,255,255,0.25)] backdrop-blur-xl"
              >
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleFieldChange("name")}
                    placeholder="e.g. Your Name"
                    className="mt-2 w-full rounded-2xl border border-emerald-100/80 bg-white/80 px-4 py-3 text-base text-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleFieldChange("email")}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-2xl border border-emerald-100/80 bg-white/80 px-4 py-3 text-base text-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handleFieldChange("phone")}
                    placeholder="+91 1234567890"
                    className="mt-2 w-full rounded-2xl border border-emerald-100/80 bg-white/80 px-4 py-3 text-base text-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={handleFieldChange("company")}
                    placeholder="Brand, startup, or team name"
                    className="mt-2 w-full rounded-2xl border border-emerald-100/80 bg-white/80 px-4 py-3 text-base text-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                
                {/* Plan Selection Dropdown */}
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 mb-3">
                    Select Service Plan
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                        if (!isDropdownOpen) {
                          setExpandedCategory(null);
                        }
                      }}
                      className="w-full rounded-2xl border border-emerald-100/80 bg-white/80 px-4 py-3 text-left text-base text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 flex items-center justify-between"
                    >
                      <span className={formData.selectedPlan ? "text-slate-800" : "text-slate-500"}>
                        {formData.selectedPlan 
                          ? `${formData.selectedPlan.name} - ${formData.selectedPlan.price}`
                          : "Choose a service plan..."
                        }
                      </span>
                      <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-full rounded-2xl border border-emerald-100/80 bg-white shadow-lg max-h-80 overflow-y-auto">
                        {Object.entries(groupedPlans).map(([category, plans]) => (
                          <div key={category}>
                            {/* Category Header - Clickable to expand/collapse */}
                            <button
                              type="button"
                              onClick={() => handleCategoryToggle(category)}
                              className="w-full px-4 py-3 text-left hover:bg-emerald-100/60 hover:shadow-sm transition-all duration-200 flex items-center justify-between border-b border-emerald-100 bg-emerald-50/30"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-emerald-700">
                                  {category}
                                </span>
                                <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                                  {plans.length} plans
                                </span>
                              </div>
                              <ChevronRight 
                                className={`h-4 w-4 text-emerald-600 transition-transform ${
                                  expandedCategory === category ? 'rotate-90' : ''
                                }`} 
                              />
                            </button>
                            
                            {/* Sub-dropdown with plans */}
                            {expandedCategory === category && (
                              <div className="bg-white border-l-2 border-emerald-200">
                                {plans.map((plan, index) => (
                                  <button
                                    key={`${category}-${index}`}
                                    type="button"
                                    onClick={() => handlePlanSelect(plan)}
                                    className="w-full px-6 py-3 text-left hover:bg-emerald-50/80 hover:shadow-sm transition-all duration-200 flex items-center justify-between border-b border-slate-100 last:border-b-0"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-medium text-slate-800">
                                          {plan.name}
                                        </span>
                                        {plan.popular && (
                                          <span className="px-2 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
                                            Popular
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-sm text-emerald-600 font-semibold">
                                        {plan.price}
                                      </div>
                                    </div>
                                    {formData.selectedPlan?.name === plan.name && (
                                      <Check className="h-4 w-4 text-emerald-600" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Quick selection hint */}
                        <div className="px-4 py-2 text-xs text-slate-500 bg-slate-50 border-t border-slate-100">
                          💡 Click on a category to see available plans and pricing
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Selected Plan Display */}
                  {formData.selectedPlan && (
                    <div className="mt-4 rounded-2xl border border-emerald-100/80 bg-emerald-50/30 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg font-semibold text-emerald-700">
                          ✓
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">
                            {formData.selectedPlan.name}
                          </h4>
                          <p className="text-sm text-emerald-600 font-semibold">
                            {formData.selectedPlan.price}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {formData.selectedPlan.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Tell us about your project
                  </label>
                  <textarea
                    rows={4}
                    value={formData.projectDetails}
                    onChange={handleFieldChange("projectDetails")}
                    placeholder="Share goals, timelines, platforms, existing assets, or anything else you want us to know."
                    className="mt-2 w-full rounded-3xl border border-emerald-100/80 bg-white/80 px-4 py-3 text-base text-slate-800 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-3xl bg-emerald-600 px-6 py-4 text-lg font-semibold uppercase tracking-[0.3em] text-white transition-all duration-200 hover:bg-emerald-500 disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Send request"}
                </button>

                {status === "success" && (
                  <p className="text-center text-sm font-medium text-emerald-600">
                    Thanks! We&apos;ve received your request and sent you a confirmation email. We&apos;ll get back within 48 hours.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm font-medium text-red-500">
                    Something went wrong. Please try again shortly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
        <Connect />
        <Footer />
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactPageContent />
    </Suspense>
  );
}