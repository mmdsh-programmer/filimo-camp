module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      borderRadius: {
        "2lg": "10px",
      },
      backgroundImage: {
        "bg-gradient-to-custom": "linear-gradient(to bottom, #1c1161, #110942)",
      },
      width: {
        "w-10/5": "42px",
      },
      height: {
        "h-10/5": "42px",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    fontFamily: {
      "dana-regular": "dana-regular",
      "dana-medium": "dana-medium",
      "dana-demibold": "dana-demibold",
    },
  },
  plugins: [],
};
