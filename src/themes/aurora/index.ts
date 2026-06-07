import type { Theme } from "../types";
import AuroraLayout from "./Layout";
import Home from "./pages/Home";
import MusicPlaceholder from "./pages/MusicPlaceholder";
import Work from "./pages/Work";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Movies from "@/pages/Movies";
import NotFound from "@/pages/NotFound";

const aurora: Theme = {
  id: "aurora",
  name: "Aurora",
  Layout: AuroraLayout,
  pages: { home: Home, work: Work, books: Books, bookDetail: BookDetail, movies: Movies, music: MusicPlaceholder, notFound: NotFound },
};
export default aurora;
