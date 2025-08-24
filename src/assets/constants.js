// MainNavbar menu items
export const menuItems = [
  { label: "Homepage", path: "/", icon: "house-fill" },
  { label: "Search", path: "/search", icon: "search" },
  { label: "Family Recipes", path: "/family-recipes", icon: "heart-fill" },
  { label: "About", path: "/about", icon: "info-circle-fill" },
];

export const loggedInMenuItems = [
  { label: "Logout", path: "/logout", icon: "box-arrow-in-right" },
];

export const loggedOutMenuItems = [
  { label: "Hello Guest,", path: "#", icon: "house-fill" },
  { label: "Login", path: "/login", icon: "box-arrow-in-right" },
  { label: "Register", path: "/register", icon: "person-plus-fill" },
];

// Color constants
export const colors = {
  background: "#fbf7f0", // Very light cream
  accent: "#e07a5f", // Warm terracotta
  primary: "#4a4a4a", // Medium charcoal • headlines, buttons
  deep: "#2e2e2e", // Dark charcoal • footers, overlays
  text: "#333333", // Soft black • body copy
  muted: "#a89f91", // Muted taupe • subtitles, metadata
  highlight: "#81b29a", // Sage green • badges, highlights
  link: "#3d405b", // Deep desaturated indigo • links/icons
};
