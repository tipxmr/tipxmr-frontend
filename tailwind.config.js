module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    flex: {
      1: "1 1 0%",
      2: "2 2 0%",
      3: "3 3 0%",
      4: "4 4 0%",
      5: "5 5 0%",
      6: "6 6 0%",
      7: "7 7 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
      full: "1 0 100%",
    },
    fontFamily: {
      sans: ["MoneroGothic"],
      serif: ["MoneroGothic"],
      mono: ["MoneroGothic"],
      display: ["MoneroGothic"],
      body: ["MoneroGothic"],
    },
    extend: {
      colors: {
        xmrorange: {
          lightest: "#FF8000",
          lighter: "#FF7733",
          default: "#F16822",
          darker: "#EB601A",
          darkest: "#B13A00",
        },
        xmrgray: {
          lighter: "#696969",
          default: "#4C4C4C",
          darker: "#404040",
        },
      },
      rotate: {
        360: "359deg",
      },
    },
  },
  variants: {
    opacity: ["disabled"],
  },
  plugins: [],
};
