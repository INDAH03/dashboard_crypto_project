import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
}

function CryptoNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/api/news", {
          params: { page, pageSize },
        });
        if (response.data && response.data.articles) {
          setArticles(response.data.articles);
          setTotalResults(response.data.totalResults || 0);
        } else {
          setError("No news data available");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  const totalPages = Math.max(Math.ceil(totalResults / pageSize), 1);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-5">Crypto News</h1>

      {loading && <div className="text-center text-primary">Loading...</div>}
      {error && <div className="text-center text-danger">{error}</div>}

      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  className="card-img-top"
                  alt={article.title}
                  onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <small className="text-muted mb-2">
                  {article.source?.name || "Unknown"} | {new Date(article.publishedAt).toLocaleDateString()}
                </small>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button
          className="btn btn-secondary"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </button>
        <span>Page {page} / {totalPages}</span>
        <button
          className="btn btn-secondary"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CryptoNews;
