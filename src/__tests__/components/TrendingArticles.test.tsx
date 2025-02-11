import { render, screen } from "@testing-library/react";
import TrendingArticles from "../../components/common/TrendingArticles";

describe("TrendingArticles", () => {
  const mockArticles = [
    {
      urlToImage: "https://via.placeholder.com/150",
      title: "Test Article 1",
      url: "https://example.com/article1",
    },
    {
      urlToImage: "https://via.placeholder.com/150",
      title: "Test Article 2",
      url: "https://example.com/article2",
    },
  ];

  it("renders the articles correctly when status is 'succeeded'", () => {
    render(<TrendingArticles status="succeeded" articles={mockArticles} />);

    mockArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });

    const readMoreLinks = screen.getAllByText("Read more →");
    expect(readMoreLinks.length).toBe(mockArticles.length);

    readMoreLinks.forEach((link, index) => {
      expect(link).toHaveAttribute("href", mockArticles[index].url);
    });

    const images = screen.getAllByAltText("thumbnail");
    expect(images.length).toBe(mockArticles.length);
    mockArticles.forEach((article, index) => {
      expect(images[index]).toHaveAttribute("src", article.urlToImage);
    });
  });

  it("renders the fallback image when urlToImage is missing", () => {
    const articlesWithNoImage = [
      {
        urlToImage: "",
        title: "Article Without Image",
        url: "https://example.com/article3",
      },
    ];

    render(
      <TrendingArticles status="succeeded" articles={articlesWithNoImage} />
    );

    const image = screen.getByAltText("thumbnail");
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/100");
  });
});
