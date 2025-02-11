import { render } from "@testing-library/react";
import TrendingArticlesSkeleton from "../../../../components/common/skeleton/TrendingArticlesSkeleton";

describe("TrendingArticlesSkeleton", () => {
  it("renders correctly with the expected structure and classes", () => {
    const { container } = render(<TrendingArticlesSkeleton />);

    const skeleton = container.querySelector("aside");
    expect(skeleton).toBeInTheDocument();

    expect(skeleton).toHaveClass(
      "space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md sticky top-0 z-10"
    );

    const titleDiv = skeleton?.querySelector("h2");
    expect(titleDiv).toBeInTheDocument();

    const titleSkeleton = titleDiv?.querySelector("div");
    expect(titleSkeleton).toHaveClass(
      "w-3/4 h-4 bg-gray-300 rounded animate-pulse"
    );

    const articleSkeletons = Array.from(
      skeleton?.querySelectorAll(".flex.items-start.gap-4.animate-pulse") || []
    );

    expect(articleSkeletons.length).toBe(5);

    articleSkeletons.forEach((article) => {
      const [imageDiv, contentDiv] = article.querySelectorAll("div");

      expect(imageDiv).toHaveClass("w-16 h-16 bg-gray-300 rounded-md");

      const contentDivChildren = Array.from(
        contentDiv?.querySelectorAll("div") || []
      );

      const expectedClasses = [
        "w-3/4 h-4 bg-gray-300 rounded mb-2",
        "w-full h-4 bg-gray-300 rounded mb-2",
        "w-1/2 h-4 bg-gray-300 rounded mb-3",
        "w-3/4 h-4 bg-gray-300 rounded mb-2",
      ];

      contentDivChildren.forEach((div, i) => {
        expect(div).toHaveClass(expectedClasses[i]);
      });
    });
  });
});
