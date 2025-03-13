import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "back-bars": "var(--back-bars)",
                "logo-color": "var(--logo-color)",
                "lines": "var(--lines)",
                "buy": "var(--buy)",
                "detail": "var(--detail)",
                "delete": "var(--delete)",
                "table-header": "var(--table-header)",
            },
        },
    },
    plugins: [],
} satisfies Config;
