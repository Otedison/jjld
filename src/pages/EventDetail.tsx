import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { getEventBySlug } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import SubscribeCta from "@/components/SubscribeCta";

const EventDetail = () => {
  const { slug = "" } = useParams();
  const { data: event, isLoading, isError } = useQuery({
    queryKey: ["events", "detail", slug],
    queryFn: () => getEventBySlug(slug),
    enabled: Boolean(slug),
  });

  return (
    <section className="py-16 bg-background">
      <div className="site-container max-w-4xl">
        <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to News & Events
        </Link>

        {isLoading && <p className="text-muted-foreground">Loading event...</p>}
        {!isLoading && isError && <p className="text-muted-foreground">No events yet.</p>}
        {!isLoading && !isError && !event && <p className="text-muted-foreground">No events yet.</p>}

        {!isLoading && event && (
          <div className="space-y-6">
            <article className="bg-background border rounded-xl shadow-card overflow-hidden">
              <img
                src={event.coverImageUrl || "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80"}
                alt={event.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-6 md:p-8">
                <h1 className="font-heading text-3xl text-foreground mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    {formatDate(event.startAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.venue || (event.isVirtual ? "Online Event" : "Venue TBA")}
                  </span>
                </div>
                <p className="whitespace-pre-line text-foreground/90 mb-6">{event.description}</p>
                {event.status === "scheduled" ? (
                  <Button asChild variant="hero-primary">
                    <Link to={`/events/${event.slug}/register`}>Register for Event</Link>
                  </Button>
                ) : (
                  <Button variant="outline" disabled>
                    Registration Not Open
                  </Button>
                )}
              </div>
            </article>

            <SubscribeCta
              source={`event-detail-${event.slug}`}
              title="Subscribe for Event Notifications"
              description="Get notified about upcoming civic events, county forums, and training opportunities."
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default EventDetail;
