import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        axios
            .post(route("login"), {
                email: data.email,
                password: data.password,
                remember: data.remember,
            })
            .then((response) => {
                if (response.data.success) {
                    const userRole = response.data.role;
                    if (userRole === "admin") {
                        window.location.assign("/admin");
                    } else if (userRole === "supervisor") {
                        window.location.assign("/supervisor");
                    } else {
                        window.location.assign("/dashboard");
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Login gagal, periksa kembali email dan password Anda.");
            });
    };

    return (
        <div className="min-h-screen flex bg-white font-sans antialiased text-slate-800">
            <Head title="Log in - BSA Logistics" />

            {/* SISI KIRI: FORM LOGIN */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-16 xl:px-28 relative bg-white">
                <div className="max-w-md w-full mx-auto space-y-8">
                    <div className="flex items-center gap-2 group cursor-pointer shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-700 to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                            B
                        </div>
                        <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wide whitespace-nowrap">
                            bsa logistics
                        </span>
                    </div>

                    {/* Header Teks */}
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E31E24]"></span>
                            Welcome Back
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                            Welcome{" "}
                            <span className="text-[#F15A24]">Back.</span>
                        </h1>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Sign in to your bsa logistics workspace and pick up
                            right where you left off.
                        </p>
                    </div>

                    {status && (
                        <div className="text-sm font-semibold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                            {status}
                        </div>
                    )}

                    {/* Form Input */}
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
                                        />
                                    </svg>
                                </span>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-white border-slate-200 text-slate-800 placeholder:text-slate-300 focus:border-[#E31E24] focus:ring-[#E31E24]/10 rounded-full text-sm transition-all shadow-sm"
                                    placeholder="you@company.com"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            <InputError
                                message={errors.email}
                                className="mt-1.5 text-xs text-red-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </span>
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="block w-full pl-11 pr-12 py-3.5 bg-white border-slate-200 text-slate-800 placeholder:text-slate-300 focus:border-[#E31E24] focus:ring-[#E31E24]/10 rounded-full text-sm transition-all shadow-sm"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-1.5 text-xs text-red-500"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center cursor-pointer select-none">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    className="rounded border-slate-300 text-[#E31E24] focus:ring-[#E31E24]/20 w-4 h-4"
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-slate-400 font-semibold text-xs">
                                    Remember me
                                </span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-xs font-black text-[#E31E24] hover:text-[#E31E24]/80 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-[#E31E24] hover:bg-[#E31E24]/90 active:bg-[#E31E24] text-white font-black py-3.5 px-4 rounded-full justify-center shadow-lg shadow-[#E31E24]/20 hover:shadow-[#E31E24]/30 transition-all text-xs tracking-wider flex items-center gap-2"
                                disabled={processing}
                            >
                                {processing ? "Signing in..." : "Log in"}
                                <span className="text-sm font-bold">→</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* SISI KANAN: HERO BANNER GUDANG */}
            <div className="hidden lg:flex lg:w-1/2 p-4 bg-white items-stretch">
                <div className="w-full relative rounded-[32px] overflow-hidden bg-slate-900 flex flex-col justify-end p-12 xl:p-16 shadow-inner">
                    <img
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                        alt="BSA Logistics Warehouse Terminal"
                        className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none mix-blend-luminosity brightness-[0.4]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 pointer-events-none"></div>

                    <div className="absolute top-8 right-8 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live - 284 fleet active
                    </div>

                    <div className="relative z-20 space-y-3 max-w-xl">
                        <h2 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.15]">
                            Move the world, one shipment at a time.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
