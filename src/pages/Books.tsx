
import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookCard } from "@/components/BookCard";
import { mockBooks } from "@/data/books";
import { Search } from "lucide-react";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Get all unique categories from books and sort alphabetically
  const categories = [...new Set(mockBooks.map(book => book.category))].sort();
  
  // Extract unique years from readDate and sort
  const years = useMemo(() => {
    const allYears = mockBooks
      .filter(book => book.readDate)
      .map(book => {
        const match = book.readDate?.match(/\d{4}$/);
        return match ? match[0] : null;
      })
      .filter(Boolean) as string[];
    
    return [...new Set(allYears)].sort((a, b) => Number(b) - Number(a)); // Sort descending (newest first)
  }, []);

  // Set latest year as default selected year if available
  useMemo(() => {
    if (years.length > 0 && !selectedYear) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  // Filter books based on search query, category, and year
  const filteredBooks = useMemo(() => {
    return mockBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" ? true : book.category === selectedCategory;
      const matchesYear = selectedYear 
        ? book.readDate?.includes(selectedYear) 
        : true;
      
      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto sm:px-6 xl:px-8">
        <h1 className="text-4xl font-bold mb-8">Books I've Read</h1>
        
        {/* Search and filter section */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="pl-10"
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
            }}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year filter */}
        {years.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {years.map((year) => (
                <span 
                  key={year}
                  onClick={() => setSelectedYear(year === selectedYear ? null : year)}
                  className={`cursor-pointer text-xs ${
                    selectedYear === year 
                      ? "text-primary font-medium" 
                      : "text-gray-300 hover:text-gray-400"
                  }`}
                >
                  {year}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Books grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No books found matching your search criteria.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Books;
