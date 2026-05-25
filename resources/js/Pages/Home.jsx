import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";

const ScrollReveal = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Di-unobserve agar animasinya mengunci setelah dimunculkan sekali
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 },
        );
        const currentTarget = domRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }
        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, []);

    return (
        <div
            ref={domRef}
            style={{
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            className={`transition-all duration-1000 transform ${
                isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-16 scale-95 pointer-events-none"
            } ${className}`}
        >
            {children}
        </div>
    );
};

const CounterUp = ({ target, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime = null;
                    const animate = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const progressPercent = Math.min(
                            progress / duration,
                            1,
                        );
                        const easeProgress =
                            progressPercent * (2 - progressPercent);
                        setCount(Math.floor(easeProgress * target));
                        if (progress < duration) {
                            requestAnimationFrame(animate);
                        } else {
                            setCount(target);
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 },
        );

        const currentTarget = elementRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }
        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [target, duration]);

    return (
        <span ref={elementRef}>
            {count.toLocaleString("en-US")}
            {suffix}
        </span>
    );
};

const Home = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const faqs = [
        {
            q: "Where can I find my tracking number?",
            a: "You can find your tracking number in the confirmation email or SMS sent right after your shipment is processed in our warehouse center.",
        },
        {
            q: "What types of logistics services do you offer?",
            a: "We offer complete end-to-end solutions including Air Freight, Ocean Freight, Express Delivery, and Enterprise Warehousing Management.",
        },
        {
            q: "How are facility feedback and ratings handled?",
            a: "Our field staff reports physical asset and warehouse ratings directly via our integrated mobile operational portal.",
        },
    ];

    const statsData = [
        { target: 10000, suffix: "+", label: "Batches Managed" },
        { target: 2500, suffix: "+", label: "Active Clients" },
        { target: 98, suffix: "%", label: "On-Time Deliveries" },
        { target: 200, suffix: "+", label: "Delivery Ports" },
    ];

    return (
        <div className="bg-slate-50 text-slate-800 h-screen overflow-y-scroll snap-y snap-mandatory selection:bg-red-600 selection:text-white scroll-smooth">
            <Head title="Effortless Logistics Services" />
            <nav className="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-slate-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-700 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-md transition-transform duration-500 cubic-bezier(0.34,1.56,0.64,1) group-hover:scale-110 group-hover:rotate-3">
                            S
                        </div>
                        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wide">
                            swiftlogix
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <a
                            href="#hero"
                            className="hover:text-red-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all hover:after:w-full"
                        >
                            Home
                        </a>
                        <a
                            href="#services"
                            className="hover:text-red-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all hover:after:w-full"
                        >
                            Services
                        </a>
                        <a
                            href="#safety"
                            className="hover:text-red-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all hover:after:w-full"
                        >
                            Fleet Safety
                        </a>
                        <a
                            href="#faq"
                            className="hover:text-red-600 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all hover:after:w-full"
                        >
                            FAQ
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm font-bold text-red-600 hover:text-red-700 px-4 py-2 transition-colors duration-200"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/admin/login"
                            className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition-all duration-300 transform active:scale-95 hover:scale-105 hover:-rotate-1"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>
            <header
                id="hero"
                className="snap-start h-screen w-full flex items-center relative bg-gradient-to-b from-red-50/50 via-white to-transparent pt-20 overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
                    <div className="lg:col-span-6 text-center lg:text-left space-y-6">
                        <div className="animate-[slideUp_0.8s_cubic-bezier(0.34,1.56,0.64,1)_1]">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                                Effortless Logistics,{" "}
                                <span className="text-red-600 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                    Every Step
                                </span>{" "}
                                of the Way.
                            </h1>
                        </div>
                        <p className="text-slate-650 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed animate-[slideUp_1s_cubic-bezier(0.34,1.56,0.64,1)_1]">
                            Streamline your supply chain operations, manage
                            assets smartly, and track inventory metrics globally
                            with our high-end framework solutions.
                        </p>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 animate-[slideUp_1.2s_cubic-bezier(0.34,1.56,0.64,1)_1]">
                            <a
                                href="#services"
                                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xl shadow-red-600/20 transition-all duration-300 transform active:scale-95 hover:scale-105"
                            >
                                Get Started
                            </a>
                            <button className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 shadow-sm transition-all duration-300 transform active:scale-95 hover:border-slate-300">
                                Come Demo
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-6 relative flex justify-center animate-[slideUp_1.4s_cubic-bezier(0.34,1.56,0.64,1)_1]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-red-400 to-orange-300 rounded-full filter blur-3xl opacity-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                            alt="Logistics Airplane and Truck"
                            className="rounded-3xl shadow-2xl border border-white/50 w-full max-w-lg object-cover h-[340px] md:h-[380px] transition-all duration-500 hover:scale-105 hover:rotate-1 animate-[float_6s_ease-in-out_infinite]"
                            style={{
                                "--keyframes-float":
                                    "from, to { transform: translateY(0); } 50% { transform: translateY(-12px); }",
                                "--keyframes-slideUp":
                                    "from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }",
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* SECTION 2: CORE SERVICES */}
            <section
                id="services"
                className="snap-start h-screen w-full flex items-center bg-white border-y border-slate-100 relative overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 w-full">
                    <ScrollReveal className="space-y-3">
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            Our Core{" "}
                            <span className="text-red-600">Services</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-sm">
                            Choose the best solution for your shipment needs.
                            Wherever your cargo is delivered, we have got you
                            covered.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                        <ScrollReveal className="h-full">
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-150 shadow-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-red-200 h-full cursor-pointer">
                                <div className="space-y-3 text-left">
                                    <span className="text-xs font-bold text-red-600 tracking-wider uppercase">
                                        Air Freight
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                                        Freight Services
                                    </h3>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                                        Move your products across the globe at
                                        high speeds safely. Perfect for
                                        time-sensitive supply needs.
                                    </p>
                                </div>
                                <div className="overflow-hidden rounded-xl mt-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=85"
                                        alt="Air Cargo"
                                        className="h-40 md:h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                                    />
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-150 shadow-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-red-200 h-full cursor-pointer">
                                <div className="space-y-3 text-left">
                                    <span className="text-xs font-bold text-red-600 tracking-wider uppercase">
                                        Warehousing
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                                        Enterprise Logistics Solutions
                                    </h3>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                                        Secure storage spaces with smart
                                        inventory counts, stock opname tools,
                                        and real-time barcode trackers.
                                    </p>
                                </div>
                                <div className="overflow-hidden rounded-xl mt-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=85"
                                        alt="Warehouse Systems"
                                        className="h-40 md:h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                                    />
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* SECTION 3: FLEET SAFETY + STATS COMBINED */}
            {/* Menggabungkan Fleet Safety dan Stats ke dalam 1 Layar Penuh agar informasinya padat dan klop di layar Mac */}
            <section
                id="safety"
                className="snap-start h-screen w-full flex flex-col justify-center bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden px-4"
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full pb-10">
                    <div className="lg:col-span-5 space-y-4">
                        <ScrollReveal>
                            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                                Your Fleet's Safety, <br />
                                <span className="text-red-500">
                                    Our Top Priority
                                </span>
                            </h2>
                            <blockquote className="border-l-4 border-red-500 pl-4 text-slate-400 italic text-xs md:text-sm mt-3">
                                "We maintain robust security frameworks,
                                automated dispatch reports, and pristine
                                maintenance logs."
                            </blockquote>
                        </ScrollReveal>
                    </div>
                    <div className="lg:col-span-7">
                        <ScrollReveal>
                            <img
                                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
                                alt="Logistics Truck Fleet"
                                className="rounded-2xl shadow-2xl border border-slate-700 w-full object-cover h-[200px] md:h-[260px] transition-all duration-500 hover:scale-102"
                            />
                        </ScrollReveal>
                    </div>
                </div>

                {/* Sub-Section Stats di bagian bawah Layar 3 */}
                <div className="max-w-5xl mx-auto w-full border-t border-slate-700/50 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {statsData.map((stat, i) => (
                        <ScrollReveal key={i}>
                            <div className="group cursor-pointer p-2 rounded-xl transition-colors duration-300">
                                <p className="text-3xl md:text-4xl font-black text-red-500 transition-transform duration-500 group-hover:scale-115 inline-block">
                                    <CounterUp
                                        target={stat.target}
                                        suffix={stat.suffix}
                                        duration={2000}
                                    />
                                </p>
                                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* SECTION 4: FAQ + FOOTER COMBINED */}
            {/* Bagian FAQ, CTA, dan Footer digabung menjadi 1 section layar akhir agar user bisa scroll habis tanpa terpotong */}
            <section
                id="faq"
                className="snap-start min-h-screen w-full flex flex-col justify-between bg-slate-50 pt-24 relative overflow-hidden"
            >
                <div className="max-w-3xl mx-auto px-4 w-full flex-grow flex flex-col justify-center">
                    <ScrollReveal className="text-center space-y-3 mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                            Frequently Asked{" "}
                            <span className="text-red-600">Questions</span>
                        </h2>
                        <p className="text-slate-500 text-xs md:text-sm">
                            Find answers to common inquiries about transport
                            logistics and invoicing policies.
                        </p>
                    </ScrollReveal>

                    <div className="space-y-3 max-w-2xl mx-auto w-full">
                        {faqs.map((faq, idx) => {
                            const isExpanded = openFaq === idx;
                            return (
                                <ScrollReveal key={idx}>
                                    <div
                                        className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${isExpanded ? "border-red-200 shadow-md" : "border-slate-200"}`}
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenFaq(
                                                    isExpanded ? null : idx,
                                                )
                                            }
                                            className="w-full text-left px-5 py-3.5 flex justify-between items-center font-bold text-slate-800 hover:bg-slate-50 transition-colors duration-200 text-xs md:text-sm"
                                        >
                                            <span>{faq.q}</span>
                                            <span
                                                className={`text-red-600 transform transition-transform duration-500 ${isExpanded ? "rotate-180 text-orange-500" : ""}`}
                                            >
                                                {isExpanded ? "−" : "+"}
                                            </span>
                                        </button>
                                        <div
                                            className={`grid transition-all duration-500 ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="px-5 pb-4 text-xs text-slate-500 border-t border-slate-100 pt-2 leading-relaxed bg-slate-50/50">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

                <footer className="bg-slate-900 text-slate-400 text-[11px] py-10 border-t border-slate-800 w-full mt-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-slate-800 pb-6 mb-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-white font-black text-base">
                                <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-xs">
                                    S
                                </div>
                                <span>swiftlogix</span>
                            </div>
                            <p className="max-w-xs leading-relaxed text-slate-500 text-[10px]">
                                World-class container layout tracking and asset
                                logging built for modern logistics.
                            </p>
                        </div>
                        {["Tools", "Services", "Support"].map((title, i) => (
                            <div key={i} className="space-y-2">
                                <h5 className="text-white font-bold tracking-wider uppercase text-[9px]">
                                    {title}
                                </h5>
                                <ul className="space-y-1 text-slate-500">
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white transition-colors duration-200"
                                        >
                                            Features
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white transition-colors duration-200"
                                        >
                                            Documentation
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-slate-600 text-[10px]">
                        <p>
                            &copy; 2026 SwiftLogix Logistics Inc. All rights
                            reserved.
                        </p>
                    </div>
                </footer>
            </section>
        </div>
    );
};

export default Home;
