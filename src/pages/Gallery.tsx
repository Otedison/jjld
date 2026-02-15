import { useQuery } from "@tanstack/react-query";
import { getGalleryItems } from "@/lib/api";

const Gallery = () => {
  const { data: galleryItems = [], isLoading, error } = useQuery({
    queryKey: ["gallery-items"],
    queryFn: getGalleryItems,
  });

  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Media</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Our Gallery</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Highlights from civic education forums, leadership sessions, and community engagements.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container">
          {isLoading && <p className="mb-6 text-sm text-muted-foreground">Loading gallery...</p>}
          {error && <p className="mb-6 text-sm text-destructive">Failed to load gallery.</p>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <article key={item._id} className="bg-background border rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                <img src={item.imageUrl} alt={item.title || "Gallery item"} className="w-full h-52 object-cover" loading="lazy" />
                {(item.title || item.caption) && (
                  <div className="p-4">
                    {item.title && <h2 className="font-heading font-semibold text-foreground">{item.title}</h2>}
                    {item.caption && <p className="mt-1 text-sm text-muted-foreground">{item.caption}</p>}
                  </div>
                )}
              </article>
            ))}
          </div>
          {!isLoading && !error && galleryItems.length === 0 && <p className="mt-6 text-sm text-muted-foreground">No gallery images uploaded yet.</p>}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
