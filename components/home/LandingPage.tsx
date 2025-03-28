"use client";
import HomeNavbar from "@/components/home/HomeNavbar";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Rocket,
    Clock,
    Palette,
    MousePointerClick,
    Zap,
    DollarSign,
    PaintBucket,
    Shield,
    ChevronLeft,
    ChevronRight,
    Twitter,
    MessageCircle,
    Send,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
    { icon: Clock, title: "Create your site in under a minute" },
    { icon: DollarSign, title: "Only 0.1 SOL to get started" },
    { icon: Palette, title: "Choose from dozens of stunning templates" },
    { icon: MousePointerClick, title: "No technical skills required" },
];

const benefits = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Create and launch in under a minute",
    },
    {
        icon: DollarSign,
        title: "Affordable",
        description: "Just 0.1 SOL—no hidden fees",
    },
    {
        icon: PaintBucket,
        title: "Customizable",
        description: "Make it yours with ease",
    },
    {
        icon: Shield,
        title: "Trusted",
        description: "Join thousands of memecoin creators",
    },
];

const testimonials = [
    {
        quote: "I launched my memecoin site in minutes—so easy!",
        author: "Alex K.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
    {
        quote: "Affordable and fast, highly recommend!",
        author: "Sarah M.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    },
];

const stats = [
    { value: "10,000+", label: "Sites Created" },
    { value: "< 60", label: "Seconds" },
    { value: "0.1", label: "SOL" },
    { value: "24/7", label: "Support" },
];

const templates = [
    {
        title: "Cosmic Doge",
        description: "A sleek, modern design for the next big meme",
    },
    { title: "Moon Rocket", description: "Perfect for launching to the moon" },
    {
        title: "Pepe Premium",
        description: "Classic meme aesthetics meet modern design",
    },
    { title: "Diamond Hands", description: "For the true believers" },
    { title: "Meme Lord", description: "Rule the meme kingdom" },
];
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
export default function LandingPage() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const { publicKey } = useWallet();
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Nav Bar */}
            <HomeNavbar />

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900/20" />
                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex mb-6">
                            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/50 shadow-lg shadow-pink-500/20">
                                <span className="text-pink-400 text-sm font-semibold">
                                    Launch in seconds, not days
                                </span>
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Create Your Memecoin Site in Minutes
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Pick from dozens of stunning templates and go live
                            in under a minute for just 0.1 SOL
                        </p>
                        <a
                            href="/dashboard"
                            className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
                        >
                            Create Your Site Now
                            <Rocket className="ml-2 h-5 w-5" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all"
                            >
                                <feature.icon className="h-10 w-10 text-purple-400 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">
                                    {feature.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                step: 1,
                                title: "Enter Token Details",
                                desc: "Browse dozens of stunning designs",
                            },
                            {
                                step: 2,
                                title: "Customize It",
                                desc: "Add your memecoin's branding in a few clicks",
                            },
                            {
                                step: 3,
                                title: "Pay 0.1 SOL",
                                desc: "A small fee to go live",
                            },
                            {
                                step: 4,
                                title: "Launch",
                                desc: "Your site's up in under a minute!",
                            },
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white font-bold mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Template Showcase */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Choose Your Template
                    </h2>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {templates.map((template, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-4">
                                        <div className="rounded-xl bg-gray-800 hover:border-purple-500/50 transition-all overflow-hidden">
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={`https://picsum.photos/seed/${index}/800/600`}
                                                    alt={template.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold mb-1">
                                                    {template.title}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    {template.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all"
                            >
                                <benefit.icon className="h-10 w-10 text-purple-400 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-400">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <div className="flex items-center space-x-8">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`w-full transform transition-all duration-500 ${
                                        index === currentTestimonial
                                            ? "opacity-100 scale-100"
                                            : "opacity-0 scale-95"
                                    }`}
                                >
                                    <div className="bg-gray-800 rounded-xl p-8">
                                        <p className="text-xl mb-4">
                                            {testimonial.quote}
                                        </p>
                                        <div className="flex items-center">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.author}
                                                className="w-12 h-12 rounded-full mr-4"
                                            />
                                            <span className="font-semibold">
                                                {testimonial.author}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats Section */}
            <section className="py-24 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                        {[
                            {
                                q: "How much does it cost to create a site?",
                                a: "It only costs 0.1 SOL to create and launch your memecoin website. This is a one-time fee with no hidden charges or monthly subscriptions.",
                            },
                            {
                                q: "How long does it take to build my site?",
                                a: "The entire process takes less than a minute! Pick a template, customize your content, and launch instantly. No coding or technical skills required.",
                            },
                            {
                                q: "Do I need technical skills?",
                                a: "Not at all! Our platform is designed for everyone. The intuitive interface lets you create a professional website with just a few clicks.",
                            },
                            {
                                q: "Can I customize my site?",
                                a: "Absolutely! Choose from dozens of templates and easily customize colors, text, images, and more to match your memecoin's brand.",
                            },
                            {
                                q: "What support do you offer?",
                                a: "We provide 24/7 support via email and Discord. Our team is always ready to help with any questions or issues you might have.",
                            },
                            {
                                q: "Can I update my site after launching?",
                                a: "Yes! You can make changes to your site anytime after launch. Updates are instant and don't require any additional fees.",
                            },
                        ].map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left hover:text-purple-400">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-400">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-24 bg-gray-900/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-8">
                        Ready to Build Your Memecoin Site?
                    </h2>
                    <a
                        href="/dashboard"
                        className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold text-lg hover:from-green-500 hover:to-emerald-700 transition-all transform hover:scale-105"
                    >
                        Get Started for 0.1 SOL
                        <Rocket className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-gray-900 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-6 mb-4 md:mb-0">
                            <a
                                href="/terms"
                                className="text-gray-400 hover:text-white"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="/privacy"
                                className="text-gray-400 hover:text-white"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/contact"
                                className="text-gray-400 hover:text-white"
                            >
                                Contact Us
                            </a>
                        </div>
                        <div className="flex space-x-6">
                            <a
                                href="https://twitter.com"
                                className="text-gray-400 hover:text-purple-400"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://discord.com"
                                className="text-gray-400 hover:text-purple-400"
                            >
                                <MessageCircle className="h-5 w-5" />
                            </a>
                            <a
                                href="https://telegram.org"
                                className="text-gray-400 hover:text-purple-400"
                            >
                                <Send className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
