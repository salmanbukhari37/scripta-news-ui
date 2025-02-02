import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import ArticleList from "./components/ArticleList";

const articles = [
  {
    id: 1,
    title: "React Basics",
    content: "Learn React",
    date: "2024-02-01",
    category: "Tech",
    source: "Medium",
  },
  {
    id: 2,
    title: "Business Growth",
    content: "Startup Strategies",
    date: "2024-01-20",
    category: "Business",
    source: "Forbes",
  },
  {
    id: 3,
    title: "Healthy Living",
    content: "Fitness Tips",
    date: "2024-01-10",
    category: "Health",
    source: "TechCrunch",
  },
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Filtering logic
  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || article.category === selectedCategory) &&
      (selectedSource === "" || article.source === selectedSource) &&
      (selectedDate === "" || article.date === selectedDate)
    );
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Article Search & Filtering</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ArticleList filteredArticles={filteredArticles} />
    </div>
  );
};

export default App;
