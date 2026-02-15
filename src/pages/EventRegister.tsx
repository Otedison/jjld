import { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEventBySlug, registerForEvent } from "@/lib/api";
import { formatDate } from "@/lib/format";

const EventRegister = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [county, setCounty] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: event, isLoading, isError } = useQuery({
    queryKey: ["events", "detail", slug, "register"],
    queryFn: () => getEventBySlug(slug),
    enabled: Boolean(slug),
  });

  const onSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    setFeedback(null);
    setError(null);
    setIsSubmitting(true);
    try {
      await registerForEvent(slug, {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        organization: organization.trim() || undefined,
        county: county.trim() || undefined,
        notes: notes.trim() || undefined,
      });
      setFeedback("Registration submitted successfully.");
      setTimeout(() => navigate(`/events/${slug}`), 900);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to submit registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="site-container max-w-4xl">
        <Link to={`/events/${slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Event
        </Link>

        {isLoading && <p className="text-muted-foreground">Loading event...</p>}
        {!isLoading && isError && <p className="text-muted-foreground">Event not found.</p>}

        {!isLoading && event && (
          <div className="grid lg:grid-cols-2 gap-8">
            <article className="rounded-xl border bg-card shadow-card overflow-hidden">
              <img
                src={event.coverImageUrl || "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80"}
                alt={event.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h1 className="font-heading text-2xl text-foreground mb-3">{event.title}</h1>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {formatDate(event.startAt)}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.venue || (event.isVirtual ? "Online Event" : "Venue TBA")}
                  </p>
                </div>
                <p className="text-sm text-foreground/80 mt-4">{event.description}</p>
              </div>
            </article>

            <div className="rounded-xl border bg-background shadow-card p-6">
              <h2 className="font-heading text-xl text-foreground mb-4">Register for Event</h2>
              <form onSubmit={onSubmit} className="space-y-3">
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className="w-full rounded-md border px-3 py-2.5 text-sm" required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="w-full rounded-md border px-3 py-2.5 text-sm" required />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full rounded-md border px-3 py-2.5 text-sm" required />
                <input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Organization (optional)" className="w-full rounded-md border px-3 py-2.5 text-sm" />
                <input value={county} onChange={(e) => setCounty(e.target.value)} placeholder="County (optional)" className="w-full rounded-md border px-3 py-2.5 text-sm" />
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)" rows={4} className="w-full rounded-md border px-3 py-2.5 text-sm resize-none" />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </form>
              {feedback && <p className="text-xs text-secondary mt-2">{feedback}</p>}
              {error && <p className="text-xs text-destructive mt-2">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventRegister;
