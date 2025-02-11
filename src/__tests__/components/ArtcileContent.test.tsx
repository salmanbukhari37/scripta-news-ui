import { render, screen } from "@testing-library/react";
import ArticleContent from "../../components/common/ArticleContent";

// Mock data for articles
const mockArticles = [
  {
    urlToImage: "https://via.placeholder.com/150",
    title: "Test Article 1",
    description: "This is a test article description.",
    url: "https://example.com/article1",
  },
  {
    urlToImage: "https://via.placeholder.com/150",
    title: "Test Article 2",
    description: "This is another test article description.",
    url: "https://example.com/article2",
  },
];

describe("ArticleContent", () => {
  it("renders skeleton loaders when status is 'loading'", () => {
    render(<ArticleContent status="loading" articles={[]} />);

    const skeletons = screen.queryAllByRole("presentation");
    expect(skeletons.length).toBe(8);
  });

  it("renders error message when status is 'failed'", () => {
    render(<ArticleContent status="failed" articles={[]} />);

    const errorMessage = screen.getByText(
      "Oops! Something went wrong. We couldn't load the news at the moment. Please try again later."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders articles when status is 'succeeded'", () => {
    render(<ArticleContent status="succeeded" articles={mockArticles} />);

    const articleImages = screen.getAllByAltText("news");
    expect(articleImages.length).toBe(mockArticles.length);

    mockArticles.forEach((article, index) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
      expect(screen.getByText(article.description)).toBeInTheDocument();
    });
  });

  it("renders placeholder image if no image URL is provided in the article", () => {
    const articlesWithoutImage = [
      {
        title: "Test Article Without Image",
        description: "This article has no image.",
        url: "https://example.com/article3",
      },
    ];

    render(
      <ArticleContent status="succeeded" articles={articlesWithoutImage} />
    );

    const articleImage = screen.getByAltText("news");
    expect(articleImage).toHaveAttribute(
      "src",
      "https://picsum.photos/400/600"
    );
  });
});
