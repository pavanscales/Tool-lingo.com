import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ToolCard from "@/components/ToolCard";

const Index = () => {
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { name: "A.I", color: "bg-pink-100" },
    { name: "Ads", color: "bg-red-100" },
    { name: "Analytics", color: "bg-purple-100" },
    { name: "Automation", color: "bg-green-100" },
    { name: "Content", color: "bg-teal-100" },
    { name: "Data", color: "bg-blue-100" },
    { name: "Design", color: "bg-violet-100" },
    { name: "Development", color: "bg-indigo-100" },
    { name: "Digital products", color: "bg-green-100" },
    { name: "Email", color: "bg-blue-200" },
    { name: "Finance", color: "bg-green-100" },
    { name: "Icons", color: "bg-pink-100" },
    { name: "Ideation", color: "bg-green-100" },
    { name: "Images", color: "bg-yellow-100" },
    { name: "Launch", color: "bg-blue-100" },
    { name: "Marketing", color: "bg-pink-200" },
    { name: "Others", color: "bg-blue-100" },
    { name: "Productivity", color: "bg-yellow-100" },
    { name: "SaaS", color: "bg-blue-100" },
    { name: "Sales", color: "bg-red-100" },
    { name: "Security", color: "bg-red-100" },
    { name: "SEO", color: "bg-orange-100" },
    { name: "Social Media", color: "bg-teal-100" },
    { name: "Support", color: "bg-gray-100" },
    { name: "UX/UI", color: "bg-blue-100" },
    { name: "Video", color: "bg-red-100" },
    { name: "Writing", color: "bg-purple-100" },
  ];

  const fetchTools = async (category: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.example.com/tools${category ? `?category=${category}` : ''}`);
      if (!response.ok) throw new Error("Failed to fetch tools");
      const data = await response.json();
      setTools(data);
    } catch (err) {
      setError("Failed to load tools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools(selectedCategory);
  }, [selectedCategory]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
            </svg>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800">Submit a tool</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">Best Free Tools for</h1>
        <h1 className="text-4xl font-bold mb-6 text-red-600">UX/UI</h1>
        <p className="text-gray-700 mb-8">
          Join 1,500+ indie founders in discovering over 200+ of the best free tools.
        </p>

        {/* Categories moved here */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Categories</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Badge
                key={category.name}
                onClick={() =>
                  setSelectedCategory(selectedCategory === category.name ? null : category.name)
                }
                className={`${category.color} text-gray-800 rounded-full px-4 py-2 cursor-pointer ${
                  selectedCategory === category.name ? "border border-gray-800" : ""
                }`}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md"
              required
            />
            <Button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white"
            >
              Join our community
            </Button>
          </div>
        </form>
      </section>

      {/* Tools Section */}
      <section className="py-8 container mx-auto px-4">
        {/* Search */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="search"
            placeholder="Search for products"
            className="pl-10 py-6 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            <p className="text-center text-gray-500 col-span-full">Loading tools...</p>
          ) : error ? (
            <p className="text-center text-gray-500 col-span-full">{error}</p>
          ) : tools.length > 0 ? (
            tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No tools found for this category.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 Best Free Tools. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
