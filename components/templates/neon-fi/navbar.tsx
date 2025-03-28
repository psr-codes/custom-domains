"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Site } from "@prisma/client";

export default function Navbar({ siteData }: { siteData: Site | null }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-[#000B1E]/90 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <span className="text-[#00FFFF] font-bold text-xl tracking-wider">
                            {(siteData?.tokenomics as any)?.ticker}
                        </span>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection("home")}
                            className="text-[#00FFFF] hover:text-[#FFFF00] transition-colors cursor-pointer"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection("tokenomics")}
                            className="text-[#00FFFF] hover:text-[#FFFF00] transition-colors cursor-pointer"
                        >
                            Tokenomics
                        </button>
                        <button
                            onClick={() => scrollToSection("community")}
                            className="text-[#00FFFF] hover:text-[#FFFF00] transition-colors cursor-pointer"
                        >
                            Community
                        </button>
                        <button
                            onClick={() =>
                                window.open(
                                    (siteData?.tokenomics as any)?.buyLink,
                                    "_blank"
                                )
                            }
                            className="bg-[#00FF00] hover:bg-[#00FFFF] text-black font-bold py-2 px-4 rounded-md transition-colors shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-[#00FFFF] hover:text-[#FFFF00]"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#000B1E]/95 backdrop-blur-md">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button
                            onClick={() => scrollToSection("home")}
                            className="block w-full text-left px-3 py-2 text-[#00FFFF] hover:bg-[#001F3F] rounded-md"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection("tokenomics")}
                            className="block w-full text-left px-3 py-2 text-[#00FFFF] hover:bg-[#001F3F] rounded-md"
                        >
                            Tokenomics
                        </button>
                        <button
                            onClick={() => scrollToSection("community")}
                            className="block w-full text-left px-3 py-2 text-[#00FFFF] hover:bg-[#001F3F] rounded-md"
                        >
                            Community
                        </button>
                        <button
                            onClick={() =>
                                window.open(
                                    (siteData?.tokenomics as any)?.buyLink,
                                    "_blank"
                                )
                            }
                            className="block w-full text-center mt-4 mb-2 bg-[#00FF00] hover:bg-[#00FFFF] text-black font-bold py-2 px-4 rounded-md transition-colors shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
