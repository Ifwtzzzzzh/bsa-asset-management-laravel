import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";

// Komponen Animasi Transisi Kurva Halus
const ScrollReveal = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
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
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`transition-all duration-[1200ms] transform ${
                isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-16 scale-[0.98] pointer-events-none"
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

// Menangkap prop mapImageUrl yang dikirim dari Laravel
const Home = ({ mapImageUrl }) => {
    const [openFaq, setOpenFaq] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLocation, setActiveLocation] = useState(null);

    // Kecepatan putar otomatis marquee partner
    const marqueeSpeed = "100s";

    const faqs = [
        {
            q: "Bagaimana cara melakukan pelacakan kontainer dan dokumen?",
            a: "Anda dapat memantau pergerakan kargo secara instan melalui sistem integrasi BL Tracking, DO Tracking, dan Container Tracking real-time yang terhubung langsung di portal operasional kami.",
        },
        {
            q: "Apa keuntungan menyimpan barang impor di Bonded Logistics Center (BLC)?",
            a: "Pusat Logistik Berikat (PLB/BLC) kami telah disetujui resmi oleh Bea Cukai, memungkinkan importir untuk menangguhkan pembayaran bea masuk dan pajak hingga barang tersebut benar-benar siap dikeluarkan atau diperlukan.",
        },
        {
            q: "Apa saja cakupan wilayah operasional darat BSA Logistics?",
            a: "Kami menyediakan jangkauan armada transportasi darat (Trucking) domestik berskala nasional di seluruh jaringan Indonesia, didukung oleh infrastruktur terminal logistik utama di Jakarta, Surabaya, Semarang, Medan, Lampung, hingga Dumai.",
        },
    ];

    const statsData = [
        {
            target: 150000,
            suffix: "m²,",
            label: "Warehouse Capacity",
            hasBreak: true,
        },
        {
            target: 2021,
            suffix: "",
            label: "Year Established",
            hasBreak: false,
        },
        {
            target: 98,
            suffix: "%",
            label: "On-Time Domestic Fleet",
            hasBreak: false,
        },
        {
            target: 5,
            suffix: "Key Ports",
            label: "Inland Terminals",
            hasBreak: true,
        },
    ];

    // Posisi hitbox transparan mengunci titik merah di peta (image_8ad2b9.jpg)
    const locations = [
        {
            name: "Belawan",
            left: "8.35%",
            top: "11.6%",
            type: ["Kantor Cabang", "Fasilitas ILT"],
            desc: "Kantor Cabang Utama & Fasilitas ILT Sumatera Bagian Utara. Menangani logistik jalur selat Malaka komoditas andalan.",
        },
        {
            name: "Dumai",
            left: "13.6%",
            top: "20.3%",
            type: ["Kantor Cabang"],
            desc: "Hub Distribusi Logistik & Gateway utama industri hilir kelapa sawit serta energi Sumatera.",
        },
        {
            name: "Pekanbaru",
            left: "11.5%",
            top: "26.8%",
            type: ["Kantor Cabang"],
            desc: "Pusat Manajemen Rantai Pasok Domestik Riau, mengintegrasikan jalur darat lintas Sumatera.",
        },
        {
            name: "Siak",
            left: "15.0%",
            top: "25.2%",
            type: ["Kantor Cabang"],
            desc: "Inland Container Depot strategis untuk mendukung efisiensi operasional wilayah pesisir timur.",
        },
        {
            name: "Palembang",
            left: "20.8%",
            top: "41.6%",
            type: ["Kantor Cabang"],
            desc: "Fasilitas Pergudangan Strategis Sumatera Bagian Selatan dengan interkoneksi logistik jalur sungai dan darat.",
        },
        {
            name: "Lampung",
            left: "22.0%",
            top: "49.6%",
            type: ["Kantor Cabang"],
            desc: "Gerbang Utama Logistik Trans-Sumatera yang menghubungkan distribusi koridor Jawa - Sumatera.",
        },
        {
            name: "Jakarta",
            left: "25.2%",
            top: "55.0%",
            type: ["Kantor Cabang", "Fasilitas ILT"],
            isHeadOffice: true,
            desc: "Head Office PT BSA Logistics Indonesia Tbk & Integrated Logistics Terminal terluas.",
        },
        {
            name: "Semarang",
            left: "34.8%",
            top: "57.0%",
            type: ["Kantor Cabang", "Fasilitas ILT"],
            desc: "Fasilitas Gudang Berikat & Pusat Distribusi Jawa Tengah, melayani koridor ekspor-impor Tanjung Emas.",
        },
        {
            name: "Surabaya",
            left: "38.2%",
            top: "59.6%",
            type: ["Kantor Cabang", "Fasilitas ILT"],
            desc: "Hub Logistik Utama Indonesia Timur, mengelola terminal kontainer dan distribusi domestik terintegrasi.",
        },
        {
            name: "Makassar",
            left: "53.8%",
            top: "49.5%",
            type: ["Kantor Cabang", "Fasilitas ILT"],
            desc: "Pusat Gerbang Distribusi Multimoda Sulawesi, menggerakkan logistik untuk Kawasan Timur Indonesia.",
        },
    ];

    // Otomatis generate path array dari brand_1.png sampai brand_29.png
    const brandLogos = Array.from(
        { length: 29 },
        (_, i) => `/images/brand_${i + 1}.png`,
    );

    return (
        <div className="bg-slate-50 text-slate-800 min-h-screen scroll-smooth selection:bg-red-600 selection:text-white relative font-sans antialiased">
            <Head title="BSA Logistics Indonesia - Comprehensive & Integrated Logistics" />

            {/* FIXED RESPONSIVE NAVBAR LAYER */}
            <nav className="bg-white/90 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-slate-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 group cursor-pointer shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-700 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                            B
                        </div>
                        <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wide whitespace-nowrap">
                            bsa logistics
                        </span>
                    </div>

                    <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-600">
                        <a
                            href="#hero"
                            className="hover:text-red-600 transition-colors duration-200 whitespace-nowrap"
                        >
                            Home
                        </a>
                        <a
                            href="#services"
                            className="hover:text-red-600 transition-colors duration-200 whitespace-nowrap"
                        >
                            Our Services
                        </a>
                        <a
                            href="#network"
                            className="hover:text-red-600 transition-colors duration-200 whitespace-nowrap"
                        >
                            Our Network
                        </a>
                        <a
                            href="#safety"
                            className="hover:text-red-600 transition-colors duration-200 whitespace-nowrap"
                        >
                            Operational Safety
                        </a>
                        <a
                            href="#faq"
                            className="hover:text-red-600 transition-colors duration-200 whitespace-nowrap"
                        >
                            FAQ
                        </a>
                    </div>

                    <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
                        <Link
                            href="/login"
                            className="text-sm font-bold text-red-600 hover:text-red-700 px-3 py-2 transition-colors duration-200 whitespace-nowrap"
                        >
                            Portal Client
                        </Link>
                        <Link
                            href="/admin/login"
                            className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-red-600/10 transition-all duration-300 transform active:scale-95 hover:scale-105 whitespace-nowrap"
                        >
                            Consult Needs
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-slate-50 transition-all focus:outline-none border border-transparent active:border-slate-200"
                        aria-label="Toggle Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                <div
                    className={`lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out origin-top z-40 ${
                        isMenuOpen
                            ? "opacity-100 scale-y-100 visible h-auto max-h-[450px]"
                            : "opacity-0 scale-y-0 invisible max-h-0 overflow-hidden"
                    }`}
                >
                    <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col font-semibold text-slate-700 text-sm">
                        <a
                            href="#hero"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-3 rounded-xl hover:bg-slate-50 hover:text-red-600 transition-all duration-150"
                        >
                            Home
                        </a>
                        <a
                            href="#services"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-3 rounded-xl hover:bg-slate-50 hover:text-red-600 transition-all duration-150"
                        >
                            Our Services
                        </a>
                        <a
                            href="#network"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-3 rounded-xl hover:bg-slate-50 hover:text-red-600 transition-all duration-150"
                        >
                            Our Network
                        </a>
                        <a
                            href="#safety"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-3 rounded-xl hover:bg-slate-50 hover:text-red-600 transition-all duration-150"
                        >
                            Operational Safety
                        </a>
                        <a
                            href="#faq"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-3 rounded-xl hover:bg-slate-50 hover:text-red-600 transition-all duration-150"
                        >
                            FAQ
                        </a>

                        <div className="pt-4 mt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-center font-bold text-red-600 py-3 rounded-xl border border-slate-200 bg-white hover:bg-red-50/50 transition-all duration-150"
                            >
                                Portal Client
                            </Link>
                            <Link
                                href="/admin/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-center font-bold text-white bg-red-600 py-3 rounded-xl shadow-md hover:bg-red-700 transition-all duration-150"
                            >
                                Consult Needs
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* SECTION 1: HERO SECTION */}
            <header
                id="hero"
                className="min-h-screen w-full flex items-center relative bg-gradient-to-b from-red-50/40 via-white to-transparent pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden scroll-mt-24"
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-6 sm:space-y-8 w-full">
                    <div className="px-4 py-2 rounded-full bg-red-50 border border-red-100 text-[11px] sm:text-xs font-bold text-red-600 tracking-wide max-w-full inline-block">
                        Comprehensive and Integrated Supply Chain Solution
                    </div>

                    <div className="max-w-4xl">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.2] lg:leading-[1.15]">
                            Smart End-to-End <br />
                            <span className="bg-gradient-to-r from-red-700 to-orange-500 bg-clip-text text-transparent">
                                Logistics Throughout Indonesia.
                            </span>
                        </h1>
                    </div>

                    <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed px-2">
                        Mendorong konsistensi dan transparansi di seluruh rantai
                        pasok dengan menggabungkan jaringan luas, keahlian tim
                        lokal, serta teknologi manajemen terpadu.
                    </p>

                    <div className="flex items-center justify-center gap-4 pt-2">
                        <a
                            href="#services"
                            className="px-6 sm:px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xl shadow-red-600/20 transition-all duration-300 transform active:scale-95 hover:scale-105 flex items-center gap-2 text-xs sm:text-sm"
                        >
                            Explore Services Now <span>→</span>
                        </a>
                    </div>

                    <div className="w-full max-w-3xl mt-6 relative rounded-2xl border border-slate-200/60 bg-white p-2 shadow-xl backdrop-blur-md">
                        <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative h-[180px] sm:h-[260px] md:h-[320px] w-full shadow-inner flex flex-col items-center justify-center p-4 text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-dashed border-red-500/60 animate-[spin_20s_linear_infinite] flex items-center justify-center mb-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                    <svg
                                        className="w-4 sm:w-5 h-4 sm:h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[10px] sm:text-xs tracking-widest text-red-400 uppercase font-bold">
                                    Optimizing Performance with Smart Tech
                                </p>
                                <p className="text-base sm:text-xl font-bold text-white tracking-tight">
                                    Warehouse Management System Live
                                </p>
                            </div>
                            <div className="w-32 sm:w-48 bg-white/[0.08] h-1.5 rounded-full overflow-hidden mt-4">
                                <div className="bg-gradient-to-r from-red-600 to-orange-500 h-full w-[98%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* SECTION 2: SERVICES GRID */}
            <section
                id="services"
                className="min-h-screen w-full flex items-center bg-white relative py-20 overflow-hidden scroll-mt-24"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10 md:space-y-14">
                    <div className="text-center space-y-2">
                        <div className="text-xs font-bold uppercase tracking-widest text-red-600">
                            Our Pillars of Excellence
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            Comprehensive Logistics Solutions
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full items-stretch">
                        {[
                            {
                                title: "Multimodal Forwarding",
                                svgPath:
                                    "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                                text: "Layanan freight forwarding komprehensif, kepabeanan (customs brokerage), manajemen pelabuhan, hingga bongkar muat kargo secara aman.",
                            },
                            {
                                title: "Smart Warehouse",
                                svgPath:
                                    "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                                text: "Fasilitas gudang strategis berkapasitas 150,000 m² termasuk Cold Storage, yang didukung teknologi WMS untuk optimasi persediaan.",
                            },
                            {
                                title: "Nationwide Trucking",
                                svgPath:
                                    "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 5H4a1 1 0 00-1 1v11h2a2 2 0 014 0h5a2 2 0 014 0h2a1 1 0 001-1v-4l-3-3H13V5z",
                                text: "Penyediaan ragam transportasi darat domestik untuk pengantaran nasional yang terpantau ketat secara aman dan tepat waktu.",
                            },
                            {
                                title: "Inland Container Depot",
                                svgPath:
                                    "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                                text: "Terminal logistik modern untuk penitipan kontainer, stuffing & stripping, fumigasi, serta agen pemeliharaan reefer container.",
                            },
                        ].map((item, idx) => (
                            <ScrollReveal key={idx}>
                                <div className="p-6 sm:p-7 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm hover:border-red-500/30 transition-all duration-300 md:hover:-translate-y-2 h-full flex flex-col justify-between group cursor-pointer">
                                    <div className="space-y-4">
                                        <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-red-600 flex items-center justify-center shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d={item.svgPath}
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                    <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1 pt-6 md:group-hover:translate-x-1 transition-transform">
                                        Learn more →
                                    </span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: NETWORK OPERASIONAL - INTERACTIVE OVERLAY MAP LAYER */}
            <section
                id="network"
                className="py-20 lg:py-24 bg-white scroll-mt-24"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <p className="text-xs font-bold uppercase tracking-widest text-red-600">
                            Jaringan Strategis Nusantara
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            Jaringan Lokasi Operasional
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm">
                            Infrastruktur logistik terintegrasi di titik-titik
                            ekonomi utama Indonesia guna memastikan kelancaran
                            suplai domestik maupun global.
                        </p>
                    </div>

                    <ScrollReveal className="bg-white border border-slate-100 rounded-3xl p-4 sm:p-6 shadow-sm relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                            <div className="lg:col-span-8 relative bg-white rounded-2xl border border-slate-100 p-1 flex items-center justify-center overflow-hidden select-none">
                                <div className="relative w-full h-full max-w-[760px]">
                                    <img
                                        src={mapImageUrl}
                                        alt="BSA Logistics Indonesia Operational Map"
                                        className="w-full h-auto object-contain block pointer-events-none select-none"
                                    />

                                    {locations.map((loc, idx) => {
                                        const isSelected =
                                            activeLocation?.name === loc.name;
                                        return (
                                            <div
                                                key={idx}
                                                style={{
                                                    left: loc.left,
                                                    top: loc.top,
                                                }}
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group/pin"
                                                onMouseEnter={() =>
                                                    setActiveLocation(loc)
                                                }
                                                onMouseLeave={() =>
                                                    setActiveLocation(null)
                                                }
                                                onClick={() =>
                                                    setActiveLocation(
                                                        isSelected ? null : loc,
                                                    )
                                                }
                                            >
                                                {(loc.isHeadOffice ||
                                                    isSelected) && (
                                                    <span className="absolute inline-flex h-10 w-10 rounded-full bg-red-600/30 animate-ping -left-[12px] -top-[12px]"></span>
                                                )}

                                                <div className="absolute w-10 h-10 -left-5 -top-5 bg-transparent rounded-full z-10" />

                                                <div
                                                    className={`w-4 h-4 rounded-full border-[2.5px] border-white shadow-lg relative z-20 transition-all duration-300 transform group-hover/pin:scale-115 ${
                                                        loc.isHeadOffice
                                                            ? "bg-red-600 ring-4 ring-red-500/20 scale-110"
                                                            : isSelected
                                                              ? "bg-red-600 scale-110"
                                                              : "bg-orange-500 group-hover/pin:bg-red-600"
                                                    }`}
                                                ></div>

                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900/95 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-md opacity-0 group-hover/pin:opacity-100 transition-opacity duration-150 whitespace-nowrap z-30 pointer-events-none tracking-wide">
                                                    {loc.name}{" "}
                                                    {loc.isHeadOffice && "★"}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="lg:col-span-4 flex flex-col gap-4 h-full justify-between">
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80 min-h-[220px] flex flex-col justify-between shadow-inner">
                                    {activeLocation ? (
                                        <div className="space-y-3 transition-all duration-300">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                <span
                                                    className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${activeLocation.isHeadOffice ? "bg-red-600 text-white" : "bg-slate-900 text-white"}`}
                                                >
                                                    {activeLocation.isHeadOffice
                                                        ? "Head Office"
                                                        : "Cabang"}
                                                </span>
                                                {activeLocation.type?.map(
                                                    (t, i) => (
                                                        <span
                                                            key={i}
                                                            className="bg-white border border-slate-200 text-slate-600 text-[9px] px-2 py-0.5 rounded-md font-bold shadow-sm"
                                                        >
                                                            {t}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                            <h4 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                                {activeLocation.name}
                                                {activeLocation.isHeadOffice && (
                                                    <span className="text-red-600 text-sm">
                                                        ●
                                                    </span>
                                                )}
                                            </h4>
                                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                {activeLocation.desc}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="my-auto text-center space-y-2.5 p-4">
                                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-500 animate-bounce">
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-.553.894L15 15M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 max-w-[240px] mx-auto leading-normal">
                                                Arahkan kursor atau klik titik
                                                koordinat peta untuk membedah
                                                detail kapabilitas jaringan
                                                operasional.
                                            </p>
                                        </div>
                                    )}

                                    <div className="border-t border-slate-200/60 pt-3 mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                                            <span>Head Office (HQ)</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                                            <span>Fasilitas Cabang</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl border border-slate-200/80 bg-white grid grid-cols-3 gap-2 text-center shadow-sm">
                                    <div className="p-1">
                                        <div className="text-base mb-1">🏢</div>
                                        <p className="text-[9px] font-black text-slate-700 tracking-wide uppercase">
                                            Kantor Cabang
                                        </p>
                                    </div>
                                    <div className="p-1 border-x border-slate-100">
                                        <div className="text-base mb-1">🏗️</div>
                                        <p className="text-[9px] font-black text-slate-700 tracking-wide uppercase">
                                            Fasilitas ILT
                                        </p>
                                    </div>
                                    <div className="p-1">
                                        <div className="text-base mb-1">🔴</div>
                                        <p className="text-[9px] font-black text-slate-700 tracking-wide uppercase">
                                            Destinasi Rute
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* FIXED SECTIONS: LOGO DI-PERBESAR (RESPONSIVE) & DIVIDER LINE DIHAPUS TOTAL */}
            <section className="bg-white w-full pb-24 overflow-hidden relative z-10 py-10">
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    @keyframes marquee-infinite {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee-brands {
                        display: flex;
                        width: max-content;
                        animation: marquee-infinite ${marqueeSpeed} linear infinite;
                    }
                    .animate-marquee-brands:hover {
                        animation-play-state: paused;
                    }
                `,
                    }}
                />

                <div className="relative flex items-center w-full">
                    <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/70 to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/70 to-transparent z-20 pointer-events-none"></div>

                    {/* Content Layer Infinite Loop Slider */}
                    <div className="animate-marquee-brands flex items-center gap-16 md:gap-24">
                        {/* Loop 1: Ukuran box pembungkus dinaikkan agar leluasa di layar desktop/tablet */}
                        {brandLogos.map((src, index) => (
                            <div
                                key={`brand-1-${index}`}
                                className="flex items-center justify-center w-36 sm:w-44 md:w-52 h-20 select-none filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
                            >
                                <img
                                    src={src}
                                    alt={`Partner Brand ${index + 1}`}
                                    className="max-w-full max-h-12 md:max-h-16 object-contain block mix-blend-multiply"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />
                            </div>
                        ))}
                        {/* Loop 2 */}
                        {brandLogos.map((src, index) => (
                            <div
                                key={`brand-2-${index}`}
                                className="flex items-center justify-center w-36 sm:w-44 md:w-52 h-20 select-none filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer"
                            >
                                <img
                                    src={src}
                                    alt={`Partner Brand Duplicate ${index + 1}`}
                                    className="max-w-full max-h-12 md:max-h-16 object-contain block mix-blend-multiply"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: OPERATIONAL SAFETY */}
            <section
                id="safety"
                className="min-h-screen w-full flex flex-col justify-center relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24"
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full pb-10 border-b border-slate-200">
                    <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
                        <ScrollReveal>
                            <div className="text-xs font-bold uppercase tracking-widest text-orange-600">
                                Operational Excellence
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 mt-1">
                                Real-Time Tracking, <br />
                                <span className="text-red-600">
                                    Guaranteed Delivery.
                                </span>
                            </h2>
                            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Setiap armada transportasi darat kami
                                dipersenjatai dengan teknologi pelacakan
                                real-time, dikendalikan penuh oleh tim driver
                                dan teknisi ahli guna menjamin akurasi
                                distribusi, keamanan muatan, serta ketepatan
                                jadwal tiba di pelabuhan tujuan.
                            </p>
                        </ScrollReveal>
                    </div>
                    <div className="lg:col-span-7 w-full flex justify-center">
                        <ScrollReveal className="w-full max-w-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80"
                                alt="BSA Logistics Truck Fleet"
                                className="rounded-2xl shadow-xl border border-white w-full object-cover h-[180px] sm:h-[240px] md:h-[300px]"
                            />
                        </ScrollReveal>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto w-full pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
                    {statsData.map((stat, i) => (
                        <ScrollReveal key={i}>
                            <div className="bg-white border border-slate-100 rounded-2xl p-6 h-40 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300">
                                <div className="text-3xl sm:text-4xl font-black text-red-600 tracking-tight flex flex-col items-center justify-center flex-grow">
                                    {stat.hasBreak ? (
                                        <div className="flex flex-col items-center leading-none">
                                            <CounterUp
                                                target={stat.target}
                                                duration={1800}
                                            />
                                            {stat.suffix === "m²" ? (
                                                <span className="text-2xl font-extrabold mt-1">
                                                    m<sup>2</sup>
                                                </span>
                                            ) : (
                                                <span className="text-xl font-extrabold mt-1">
                                                    {stat.suffix}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="leading-none">
                                            <CounterUp
                                                target={stat.target}
                                                suffix={stat.suffix}
                                                duration={1800}
                                            />
                                        </div>
                                    )}
                                </div>
                                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mt-auto">
                                    {stat.label}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* SECTION 5: FAQ + FOOTER */}
            <section
                id="faq"
                className="min-h-screen w-full flex flex-col justify-between pt-24 relative overflow-hidden scroll-mt-24"
            >
                <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col justify-center pb-16">
                    <ScrollReveal className="text-center space-y-2 mb-8 sm:mb-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                            Frequently Asked{" "}
                            <span className="text-red-600">Questions</span>
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Temukan jawaban seputar solusi rantai pasok
                            terintegrasi, pergudangan berikat, dan pelacakan
                            kargo kontainer.
                        </p>
                    </ScrollReveal>

                    <div className="space-y-4 max-w-2xl mx-auto w-full">
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
                                            className="w-full text-left px-5 py-4 flex justify-between items-center font-bold text-slate-800 hover:bg-slate-50 transition-colors duration-200 text-sm sm:text-base"
                                        >
                                            <span className="pr-4">
                                                {faq.q}
                                            </span>
                                            <span
                                                className={`text-red-600 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                            >
                                                {isExpanded ? "−" : "+"}
                                            </span>
                                        </button>
                                        <div
                                            className={`grid transition-all duration-300 ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="px-5 pb-5 text-sm text-slate-500 border-t border-slate-100 pt-3 leading-relaxed bg-slate-50/50">
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

                <footer className="bg-slate-900 text-slate-400 text-[11px] py-10 border-t border-slate-800 w-full mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-slate-800 pb-8 mb-6">
                        <div className="col-span-2 md:col-span-1 space-y-3">
                            <div className="flex items-center gap-2 text-white font-black text-base">
                                <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-xs">
                                    B
                                </div>
                                <span>bsa logistics</span>
                            </div>
                            <p className="max-w-xs leading-relaxed text-slate-500 text-[11px]">
                                PT BSA Logistics Indonesia Tbk — Penyedia solusi
                                logistik dan rantai pasok terintegrasi berskala
                                nasional.
                            </p>
                        </div>
                        {["Tools", "Services", "Support"].map((title, i) => (
                            <div key={i} className="space-y-2">
                                <h5 className="text-white font-bold tracking-wider uppercase text-[10px]">
                                    {title}
                                </h5>
                                <ul className="space-y-1.5 text-slate-500 text-[11px]">
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white transition-colors duration-200"
                                        >
                                            BL Tracking
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="hover:text-white transition-colors duration-200"
                                        >
                                            Faktur Pajak BSA
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-600 text-[11px]">
                        <p>
                            &copy; 2026 PT BSA Logistics Indonesia Tbk. All
                            rights reserved.
                        </p>
                    </div>
                </footer>
            </section>
        </div>
    );
};

export default Home;
