const colors = {
  blue: ["#3692FF", "#1967D6", "#1251AA"],
  white: "#FFF",
  black: "#1F2937",
  gray: {
    0: "#9CA3AF",
    1: "#F3F4F6",
    2: "#F9FAFB",
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  red: ["#F74747"],
};

const mediaQuery = {
  mobile: "screen and (max-width: 743px)",
  tablet: "screen and (min-width: 744px) and (max-width: 1199px)",
  desktop: "screen and (min-width: 1200px)",
};

const theme = {
  colors,
  mediaQuery,
};

export default theme;
