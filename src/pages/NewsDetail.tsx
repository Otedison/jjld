import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, User, Share2, Download, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { getNewsBySlug } from "@/lib/api";
import { formatDate } from "@/lib/format";

const NewsDetail = () => {
  const { slug = "" } = useParams();
  const { data: item, isLoading, isError } = useQuery({
    queryKey: ["news", "detail", slug],
    queryFn: () => getNewsBySlug(slug),
    enabled: Boolean(slug),
  });

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = item?.title || "";
    
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, "_blank");
        break;
    }
  };

  const handleDownload = () => {
    // Simulate download - in production this would trigger actual PDF download
    alert(`Downloading "${item?.title}" PDF...`);
  };

  return (
    <div>
      {/* Blog Hero Section */}
      <section className="blog-hero py-20" id="blog-hero">
        <div className="site-container">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="post-category">
              {(item?.contentType || "blog").toUpperCase()}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-5 leading-tight">
              {isLoading ? "Loading..." : item?.title || "Article Title"}
            </h1>
            {item?.excerpt && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {item.excerpt}
              </p>
            )}
            <div className="post-meta">
              <span><User className="h-4 w-4" /> By {item?.authorName || "Author"}</span>
              <span><Calendar className="h-4 w-4" /> {item ? formatDate(item.publishedAt || item.createdAt) : "Date"}</span>
              <span><Clock className="h-4 w-4" /> 12 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-16 bg-background" id="blog-content">
        <div className="site-container">
          <div className="article-content max-w-4xl mx-auto">
            {/* Back Link */}
            <Link 
              to="/news" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to News
            </Link>

            {isLoading && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Loading story...</p>
              </div>
            )}
            
            {isError && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Error loading article. Please try again later.</p>
              </div>
            )}

            {!isLoading && !isError && !item && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No article found.</p>
              </div>
            )}

            {!isLoading && !isError && item && (
              <>
                {/* Featured Image */}
                <img
                  src={item.coverImageUrl || "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1400&q=80"}
                  alt={item.title}
                  className="w-full h-80 md:h-96 object-cover rounded-lg shadow-blog mb-10"
                />

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {item.content.split('\n\n').map((paragraph, index) => {
                    // Handle blockquotes
                    if (paragraph.startsWith('"') && paragraph.endsWith('"')) {
                      return (
                        <blockquote key={index} className="blog-quote">
                          {paragraph}
                          <div className="blog-quote-author">— {item.authorName}</div>
                        </blockquote>
                      );
                    }
                    
                    // Handle headings
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
                    }
                    
                    // Handle list items
                    if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                      const items = paragraph.split('\n').filter(p => p.startsWith('- ') || p.startsWith('* '));
                      return (
                        <ul key={index}>
                          {items.map((li, i) => (
                            <li key={i}>{li.replace(/^[*-] /, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    
                    // Regular paragraph
                    return paragraph.trim() ? (
                      <p key={index}>{paragraph}</p>
                    ) : null;
                  })}
                </div>

                {/* Author Bio */}
                <div className="author-bio">
                  <img 
                    src={item.authorImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"} 
                    alt={item.authorName} 
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4>{item.authorName}</h4>
                    <p>
                      {item.authorBio || "Human rights advocate and researcher focusing on labor rights and migration issues in East Africa."}
                    </p>
                  </div>
                </div>

                {/* Share Section */}
                <div className="share-section">
                  <h3>Share This Important Story</h3>
                  <div className="share-buttons">
                    <button 
                      onClick={() => handleShare("facebook")} 
                      className="share-btn"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleShare("twitter")} 
                      className="share-btn"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleShare("linkedin")} 
                      className="share-btn"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleShare("whatsapp")} 
                      className="share-btn"
                      aria-label="Share on WhatsApp"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section className="download-cta-section" id="download-cta">
        <div className="site-container">
          <div className="download-cta-content">
            <h2>Download This Article</h2>
            <p>Get a PDF version of this important article to share with others or keep for reference.</p>
            <button 
              onClick={handleDownload}
              className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors cursor-pointer"
            >
              <Download className="h-5 w-5" /> 
              Download Article PDF
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;

