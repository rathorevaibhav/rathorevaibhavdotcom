import type { NavLink, SocialLink } from "./types";
export const navLinks: NavLink[] = [
  { title: "Home", path: "/" },
  { title: "Work", path: "/work" },
  { title: "Books", path: "/books" },
  { title: "Movies", path: "/movies" },
  { title: "Music", path: "/music" },
  { title: "Blog", path: "https://rathorevaibhav.substack.com/", external: true },
];
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/rathorevaibhav", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/rathorevaibhav", icon: "github" },
  { label: "Instagram", href: "https://instagram.com/rathorevaibhav", icon: "instagram" },
  { label: "ColoredCow", href: "https://coloredcow.com", icon: "coloredcow" },
];
