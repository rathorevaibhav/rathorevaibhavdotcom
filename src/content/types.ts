import type { Book } from "@/lib/types";
export type { Book };

export interface Profile {
  name: string;
  role: string;
  org: string;
  tagline: string;
  headline: string;       // hero headline
  subhead: string;        // hero subhead
}
export interface WorkEntry { year: string; title: string; org?: string; description: string; }
export interface Movie { title: string; year: number; director?: string; genre: string[]; image?: string; recent?: boolean; }
export interface Instrument { id: "guitar" | "mandolin"; name: string; meta: string; note: string; }
export interface MusicFavorite { title: string; artist: string; }
export interface NavLink { title: string; path: string; external?: boolean; }
export interface SocialLink { label: string; href: string; icon: "linkedin" | "github" | "instagram" | "coloredcow"; }
