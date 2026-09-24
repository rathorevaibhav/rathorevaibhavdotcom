import type { ComponentType } from "react";

export type ThemeId = string;
export type RouteKey = "home" | "work" | "books" | "bookDetail" | "movies" | "music" | "notFound";

export interface Theme {
  id: ThemeId;
  name: string;
  Layout: ComponentType;                       // renders chrome + <Outlet/>
  pages: Record<RouteKey, ComponentType>;
}
