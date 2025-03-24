import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const placeholderBlurhash =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==";

export const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// Add this URL sanitizer function
export const sanitizeSocialUrl = (url: string) => {
    if (!url || url.trim() === "") return "#"; // ✅ Return `#` for empty URLs

    // Remove extra spaces
    const trimmedUrl = url.trim();

    // ✅ If URL starts with "http" or "https", return it as is
    if (/^https?:\/\//i.test(trimmedUrl)) {
        return trimmedUrl;
    }

    // ✅ Ensure we extract only the username from known domains
    const domain = trimmedUrl.toLowerCase().replace(/^www\./, "");

    // Special handling for Twitter/X links
    if (domain.startsWith("twitter.com") || domain.startsWith("x.com")) {
        return `https://twitter.com/${trimmedUrl.replace(
            /(twitter\.com|x\.com)\//,
            ""
        )}`;
    }

    // Special handling for Telegram links
    if (domain.startsWith("t.me")) {
        return `https://t.me/${trimmedUrl.replace("t.me/", "")}`;
    }

    // Special handling for Discord links (assuming invite links)
    if (domain.startsWith("discord.gg")) {
        return `https://discord.gg/${trimmedUrl.replace("discord.gg/", "")}`;
    }

    // ✅ If it's just "x.com" or another domain, add "https://"
    return `https://${domain}`;
};

export function getSubdomain(host?: string | null) {
    if (!host) {
        console.log("No host provided");
        return null;
    }

    // First decode any URL-encoded characters (like %3A)
    const decodedHost = decodeURIComponent(host);
    console.log("Decoded host:", decodedHost);

    // Remove port number and protocol if present
    const hostWithoutPort = decodedHost
        .replace(/^https?:\/\//, "") // Remove http:// or https://
        .split(":")[0]; // Remove port

    console.log("Processing host:", hostWithoutPort);

    // Split host into parts
    const parts = hostWithoutPort.split(".");
    console.log("Host parts:", parts);

    // Localhost special case
    if (parts.includes("localhost")) {
        console.log("Localhost environment detected");
        return parts.length > 1 ? parts[0] : null;
    }

    // Standard domain (e.g., sub.domain.com)
    if (parts.length > 2) {
        const subdomain = parts[0];
        if (subdomain === "www") return null;
        return subdomain;
    }

    console.log("No subdomain detected");
    return null;
}
