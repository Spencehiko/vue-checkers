module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: {
                "screen-20": "calc(100vh - 5rem)",
            },
            colors: {
                "primary-dark": "#0A0A0A",
                "primary-gray": "#2E2E2E",
            },
        },
    },
    plugins: [],
};
