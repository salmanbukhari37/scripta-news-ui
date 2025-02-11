import { render } from "@testing-library/react";
import ArticleSkeleton from "../../../../components/common/skeleton/ArticleSkeleton";

describe("ArticleSkeleton", () => {
  it("renders correctly with the provided index", () => {
    const { container } = render(<ArticleSkeleton index={1} />);

    const skeleton = container.querySelector('div[role="presentation"]');
    expect(skeleton).toBeInTheDocument();

    expect(skeleton).toHaveClass(
      "p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-pulse"
    );

    const skeletonChildren = Array.from(
      skeleton?.querySelectorAll("div") || []
    );

    expect(skeletonChildren.length).toBe(5);

    const imageDiv = skeletonChildren[0];
    expect(imageDiv).toHaveClass("w-full h-48 bg-gray-300 rounded-md");

    const expectedClasses = [
      "w-full h-48 bg-gray-300 rounded-md",
      "mt-3",
      "w-3/4 h-4 bg-gray-300 rounded mb-2",
      "w-full h-4 bg-gray-300 rounded mb-2",
      "w-1/2 h-4 bg-gray-300 rounded mb-3",
    ];

    skeletonChildren.forEach((div, index) => {
      expect(div).toHaveClass(expectedClasses[index]);
    });
  });
});
