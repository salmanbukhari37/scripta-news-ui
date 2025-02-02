interface FiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedSource,
  setSelectedSource,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div>
        <label className="block">Category</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Business">Business</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <div>
        <label className="block">Source</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
        >
          <option value="">All Sources</option>
          <option value="TechCrunch">TechCrunch</option>
          <option value="Medium">Medium</option>
          <option value="Forbes">Forbes</option>
        </select>
      </div>

      <div>
        <label className="block">Date</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
