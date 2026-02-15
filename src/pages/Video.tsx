import { useQuery } from "@tanstack/react-query";
import { getVideos } from "@/lib/api";

function toYouTubeEmbedUrl(videoUrl: string) {
  try {
    const parsed = new URL(videoUrl);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) return videoUrl;
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch (_error) {
    // Fallback below.
  }
  return videoUrl;
}

const Video = () => {
  const { data: videoItems = [], isLoading, error } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Media</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Video</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">Watch highlights and civic education content directly on our website.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container">
          {isLoading && <p className="mb-6 text-sm text-muted-foreground">Loading videos...</p>}
          {error && <p className="mb-6 text-sm text-destructive">Failed to load videos.</p>}
          <div className="grid md:grid-cols-2 gap-6">
            {videoItems.map((item) => (
              <article key={item._id} className="bg-background border rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                <div className="aspect-video w-full">
                  <iframe
                    title={item.title}
                    src={toYouTubeEmbedUrl(item.videoUrl)}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                {item.description && (
                  <div className="px-4 py-3">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
          {!isLoading && !error && videoItems.length === 0 && <p className="mt-6 text-sm text-muted-foreground">No videos uploaded yet.</p>}
        </div>
      </section>
    </div>
  );
};

export default Video;
