import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setCategory } from "../../redux/reducers/generalSlice";

const Categories: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const { categories, category }: any = useAppSelector(
    (state: any) => state.general
  );
  const setCategoryHandler = (category: string) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="pr-4">
      <h2 className="text-lg font-semibold mb-6">Categories</h2>
      <div className="space-y-4 mb-8">
        {categories.map(({ key, title }: any) => (
          <div key={key}>
            <button
              onClick={() => setCategoryHandler(title.toLowerCase())}
              className={`w-full text-left px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                category === title.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
