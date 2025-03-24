"use client";
import { useState, useEffect } from "react";
import { Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sanitizeSocialUrl } from "@/lib/utils";
import { fetchSiteDataAction } from "@/lib/actions/actions";
import { Site } from "@prisma/client";

interface SectionProps {
    id: string;
    title?: string;
    slideFrom: "left" | "right";
    children?: React.ReactNode;
}

// const siteData = {
//     name: "Trump Coin",
//     subdomain: "trump-coin",
//     description:
//         "BabyBaby is a community made and owned cryptocurrency project. We are aspiring to become the new high quality standard within the Crypto Space. A group of like minded individuals have come together to create the new golden standard of what a community should have to offer.",
//     logoUrl: "/logo.png",
//     socials: {
//         twitter: "x.com",
//         discord: "discord.com",
//         telegram: "telegram.com",
//     },
//     tokenomics: {
//         ticker: "TRUMP",

//         chain: "Solana",

//         ca: "0x465556355sdfdfsdfsdfsdfsdfsdfsdf6435",

//         buyLink: "chatgpt.com",
//     },
//     templateId: "0", // Default template ID
//     templateData: {}, // Default empty JSON
// };

export default function HeroLayout({ subdomain }: { subdomain: string }) {
    const [showCopied, setShowCopied] = useState<boolean>(false);

    const [siteData, setSiteData] = useState<Site | null>(null);
    console.log("fetching data", subdomain);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("subdomain", subdomain);
                const d = await fetchSiteDataAction(subdomain);
                console.log("data", d);

                setSiteData(d);
            } catch {
                console.log("error fetching data");
                toast.error("Error fetching data");
            }
        };
        fetchData();
    }, [subdomain]);
    const contractAddress = (siteData?.tokenomics as any)?.ca;

    const copyAddress = (): void => {
        navigator.clipboard.writeText(contractAddress);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };

    const smoothScroll = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div className="min-h-screen max-w-screen flex flex-col">
            {/* Top Navigation Bar */}
            <Nav smoothScroll={smoothScroll} siteData={siteData} />

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col items-center justify-start">
                {/* Primary Section */}
                <div
                    id="home"
                    className="flex items-center justify-center pt-15 bg-gray-50    "
                >
                    <div className="max-w-6xl w-full flex">
                        {/* Left Side - Image/Logo */}
                        <div className="w-1/2 flex items-center justify-center px-8 py-15">
                            <Image
                                src="/logo.png"
                                alt="BabyBaby Logo"
                                className="h-100 w-100 object-contain animate-bounce "
                                width={100}
                                height={100}
                            />
                        </div>

                        {/* Right Side - Content */}
                        <div className="w-1/2 flex items-center px-8 my-8">
                            <div className="max-w-md">
                                <div className="mb-8">
                                    <h2 className="text-5xl font-bold text-gray-800 mb-4">
                                        Welcome to
                                        <span className="block text-pink-600 mt-2">
                                            {siteData?.name}
                                        </span>
                                    </h2>
                                    <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    >
                                        Buy $
                                        {(siteData?.tokenomics as any)?.ticker}
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-500">
                                                CA:
                                            </span>
                                            <button
                                                onClick={copyAddress}
                                                className="text-pink-600 hover:text-pink-700 flex items-center"
                                            >
                                                <Copy className="w-4 h-4 mr-1" />
                                                <span className="text-sm">
                                                    Copy
                                                </span>
                                            </button>
                                        </div>
                                        <code className="text-sm font-mono break-all text-gray-700">
                                            {contractAddress}
                                        </code>
                                        {showCopied && (
                                            <span className="text-sm text-green-600 block mt-1">
                                                Copied!
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Sections */}
                <Section id="about" title="About" slideFrom="left">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-6xl p-8 py-20 mx-80 px-20 bg-white rounded-xl shadow-xl   "
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Text Content - Left Side */}
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="md:w-4/7"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-pink-600   mb-6">
                                    <span> Introducing </span>
                                    <p className="w-full  ">
                                        {" "}
                                        {siteData?.name} ($
                                        <span className="text-black font-bold">
                                            {" "}
                                            {
                                                (siteData?.tokenomics as any)
                                                    ?.ticker
                                            }
                                            )
                                        </span>
                                    </p>
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {siteData?.description}
                                </p>
                            </motion.div>

                            {/* Image/Logo - Right Side */}
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="md:w-3/7 flex justify-center "
                            >
                                <div className="group relative w-64 h-64">
                                    <Image
                                        src={siteData?.logoUrl || "/logo.png"}
                                        alt="BabyBaby Logo"
                                        fill
                                        className="object-contain transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 animate-pulse"
                                        quality={100}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </Section>

                {/* tokenomics  */}
                <div className="w-full">
                    <Section
                        id="tokenomics"
                        title="Tokenomics"
                        slideFrom="left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-6xl p-8 py-20 mx-80 px-20 bg-white rounded-xl shadow-xl   "
                        >
                            <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
                                Tokenomics
                            </h2>

                            <div className="flex justify-between gap-4 mb-8">
                                <motion.div
                                    initial={{ x: -20 }}
                                    animate={{ x: 0 }}
                                    className="bg-gray-50 p-4 rounded-lg flex-1"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-500 text-sm mb-1">
                                            Ticker
                                        </p>
                                        <p className="text-2xl font-bold text-pink-600">
                                            $
                                            {
                                                (siteData?.tokenomics as any)
                                                    ?.ticker
                                            }
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: 20 }}
                                    animate={{ x: 0 }}
                                    className="bg-gray-50 p-4 rounded-lg flex-1"
                                >
                                    <Link
                                        href={
                                            sanitizeSocialUrl(
                                                (siteData?.tokenomics as any)
                                                    ?.buyLink
                                            ) || "#"
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                                    >
                                        Buy $
                                        {(siteData?.tokenomics as any)?.ticker}
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ x: 20 }}
                                    animate={{ x: 0 }}
                                    className="bg-gray-50 p-4 rounded-lg flex-1"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-500 text-sm mb-1">
                                            Chain
                                        </p>

                                        <p className="text-2xl font-bold text-pink-600">
                                            {
                                                (siteData?.tokenomics as any)
                                                    ?.chain
                                            }
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="bg-green-50 p-4 rounded-lg mb-8 flex items-center justify-center"
                            >
                                <CheckCircle className="text-green-500 mr-2" />
                                <span className="font-medium">
                                    Contract ownership is renounced
                                </span>
                            </motion.div>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            CA:
                                        </span>
                                        <button
                                            onClick={copyAddress}
                                            className="text-pink-600 hover:text-pink-700 flex items-center"
                                        >
                                            <Copy className="w-4 h-4 mr-1" />
                                            <span className="text-sm">
                                                Copy
                                            </span>
                                        </button>
                                    </div>
                                    <code className="text-sm font-mono break-all text-gray-700">
                                        {contractAddress}
                                    </code>
                                    {showCopied && (
                                        <span className="text-sm text-green-600 block mt-1">
                                            Copied!
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </Section>
                </div>

                <Section id="socials" title="Socials" slideFrom="left">
                    <div className="w-full flex justify-center items-center ">
                        <div className="w-[80vw]  flex justify-around gap-10">
                            {/* Left Side - Image/Logo */}
                            <div className="w-1/2 flex items-center justify-center px-8  ">
                                <Image
                                    src={siteData?.logoUrl || "/logo.png"}
                                    alt="BabyBaby Logo"
                                    className="h-65 w-65 object-contain animate-bounce"
                                    width={100}
                                    height={100}
                                />
                            </div>

                            {/* Right Side - Content */}
                            <div className="w-1/2 flex items-center px-8 my-8">
                                <div className="max-w-md">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                            Follow on Social Media
                                        </h2>
                                        <motion.div className="flex gap-4">
                                            {siteData?.socials &&
                                                typeof siteData.socials ===
                                                    "object" && // ✅ Ensure it's an object before mapping
                                                (
                                                    [
                                                        "twitter",
                                                        "telegram",
                                                        "discord",
                                                    ] as Array<
                                                        keyof (typeof siteData)["socials"]
                                                    >
                                                ).map(
                                                    (icon) =>
                                                        siteData.socials?.[
                                                            icon
                                                        ] && (
                                                            <Link
                                                                key={icon}
                                                                href={sanitizeSocialUrl(
                                                                    siteData
                                                                        .socials[
                                                                        icon
                                                                    ] as string
                                                                )}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="cursor-pointer"
                                                            >
                                                                <Image
                                                                    src={`/${icon}.png`}
                                                                    alt={`${icon} icon`}
                                                                    width={80}
                                                                    height={80}
                                                                    className="cursor-pointer"
                                                                />
                                                            </Link>
                                                        )
                                                )}
                                        </motion.div>
                                        {/* <motion.div className="flex gap-4">
                                            {siteData?.socials &&
                                                (
                                                    [
                                                        "twitter",
                                                        "telegram",
                                                        "discord",
                                                    ] as Array<
                                                        keyof typeof siteData.socials
                                                    >
                                                ).map((icon) => (
                                                    // Usage in your component
                                                    <Link
                                                        key={icon}
                                                        href={
                                                            sanitizeSocialUrl(
                                                                (
                                                                    siteData?.socials as Record<
                                                                        string,
                                                                        string
                                                                    >
                                                                )[icon]
                                                            ) || "#"
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="cursor-pointer"
                                                    >
                                                        <Image
                                                            src={`/${icon}.png`}
                                                            alt={`${icon} icon`}
                                                            width={80}
                                                            height={80}
                                                            className="cursor-pointer"
                                                        />
                                                    </Link>
                                                ))}
                                        </motion.div>{" "} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>

            {/* // footer */}

            <Footer siteData={siteData} />
        </div>
    );
}

interface NavProps {
    smoothScroll: (id: string) => void;
    siteData?: Site | null; // Add this
}

const Nav = ({ smoothScroll, siteData }: NavProps) => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="shadow-sm bg-white   px-8 flex items-center justify-between sticky top-0 z-50"
        >
            <div className="flex items-center space-x-8 py-2 w-full">
                <motion.h1
                    whileHover={{ scale: 1.05 }}
                    className="text-xl font-bold text-pink-600 cursor-pointer"
                >
                    {(siteData?.tokenomics as any)?.ticker}
                </motion.h1>

                <div className="hidden md:flex w-full space-x-6 justify-evenly">
                    {["home", "about", "tokenomics", "socials"].map((item) => (
                        <motion.button
                            key={item}
                            whileHover={{ scale: 1.05, color: "#db2777" }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-600 capitalize"
                            onClick={() => smoothScroll(item)}
                        >
                            {item}
                        </motion.button>
                    ))}
                </div>
            </div>
            <motion.div className="flex gap-4">
                {siteData?.socials &&
                    typeof siteData.socials === "object" && // ✅ Ensure it's an object before mapping
                    (
                        ["twitter", "telegram", "discord"] as Array<
                            keyof (typeof siteData)["socials"]
                        >
                    ).map(
                        (icon) =>
                            siteData.socials?.[icon] && (
                                <Link
                                    key={icon}
                                    href={sanitizeSocialUrl(
                                        siteData.socials[icon] as string
                                    )}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cursor-pointer"
                                >
                                    <Image
                                        src={`/${icon}.png`}
                                        alt={`${icon} icon`}
                                        width={40}
                                        height={40}
                                        className="cursor-pointer"
                                    />
                                </Link>
                            )
                    )}
            </motion.div>
        </motion.nav>
    );
};

const Section: React.FC<SectionProps> = ({
    id,
    title,
    slideFrom,
    children,
}) => {
    const variants = {
        hidden:
            slideFrom === "left"
                ? { opacity: 0, x: -100 }
                : { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <motion.div
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={variants}
            className="min-h-screen flex items-center justify-center w-full "
        >
            <div className="w-full">{children}</div>
        </motion.div>
    );
};

const Footer = ({ siteData }: { siteData: Site | null }) => {
    return (
        // all right reserved
        <div className="bg-gray-800 text-white text-center py-4">
            <p>
                &copy; {new Date().getFullYear()} {siteData?.name}. All rights
                reserved.
            </p>
        </div>
    );
};
