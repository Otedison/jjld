import { Calendar, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEvents, getNews } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { Link } from "react-router-dom";
import SubscribeCta from "@/components/SubscribeCta";

const categoryTone = {
  news: "bg-primary/10 text-primary",
  story: "bg-secondary/10 text-secondary",
  blog: "bg-muted text-foreground",
} as const;

const News = () => {
  const { t } = useI18n();
  const {
    data: articles = [],
    isLoading: loadingArticles,
    isError: articlesError,
  } = useQuery({
    queryKey: ["news", "articles"],
    queryFn: () => getNews(12),
  });

  const {
    data: upcomingEvents = [],
    isLoading: loadingEvents,
    isError: eventsError,
  } = useQuery({
    queryKey: ["events", "upcoming", 6],
    queryFn: () => getEvents(6, true),
  });

  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Stay Informed</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">News & Updates</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Live updates from your local database: news, blogs, and community stories.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Latest Articles</h2>

              {loadingArticles && <p className="text-muted-foreground">Loading articles from localhost...</p>}

              {!loadingArticles && !articlesError && articles.length > 0 && (
                <div className="space-y-6">
                  {articles.map((a) => {
                    const tone = categoryTone[a.contentType || "blog"];
                    return (
                      <article key={a._id} className="bg-background border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-shadow">
                        <img
                          src={a.coverImageUrl || "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=900&q=80"}
                          alt={a.title}
                          className="w-full h-44 rounded-md object-cover mb-4"
                          loading="lazy"
                        />
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs font-heading font-semibold px-2 py-1 rounded ${tone}`}>
                            {(a.contentType || "blog").toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {formatDate(a.publishedAt || a.createdAt)}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{a.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{a.excerpt || a.content.slice(0, 160)}...</p>
                        <Link to={`/news/${a.slug}`} className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:underline">
                          Read More <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </article>
                    );
                  })}
                </div>
              )}

              {!loadingArticles && (articlesError || articles.length === 0) && (
                <p className="text-muted-foreground">{t("ui.noPostsYet")}</p>
              )}
            </div>

            <div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Upcoming Events</h2>
              {loadingEvents ? (
                <p className="text-muted-foreground">Loading events...</p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((evt) => (
                    <div key={evt._id} className="bg-muted rounded-lg p-4 border">
                      <img
                        src={evt.coverImageUrl || "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80"}
                        alt={evt.title}
                        className="w-full h-32 rounded-md object-cover mb-3"
                        loading="lazy"
                      />
                      <span className="text-xs font-heading font-semibold text-primary">{formatDate(evt.startAt)}</span>
                      <h4 className="font-heading font-semibold text-sm text-foreground mt-1">{evt.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{evt.venue || (evt.isVirtual ? "Online" : "TBA")}</p>
                      <Link to={`/events/${evt.slug}`} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                        Event Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link to={`/events/${evt.slug}/register`} className="mt-2 ml-3 inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline">
                        Register
                      </Link>
                    </div>
                  ))}
                  {(eventsError || upcomingEvents.length === 0) && (
                    <p className="text-sm text-muted-foreground">{t("ui.noEventsYet")}</p>
                  )}
                </div>
              )}

              <div className="mt-10">
                <SubscribeCta
                  compact
                  source="news-events-cta"
                  title="Subscribe for News & Event Alerts"
                  description="Get event invites and latest updates directly to your inbox."
                />
              </div>

              <div className="mt-10">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {["News", "Blog", "Story"].map((cat) => (
                    <span key={cat} className="text-xs bg-muted text-foreground px-3 py-1.5 rounded-full border font-heading">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
