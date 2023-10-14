/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3B82F6",
                primaryHover: "#2563EB",
                secondary: {
                    500: "#BA68C8",
                    600: "#AB47BC"
                }
            }
        },
    },
    plugins: [],
}