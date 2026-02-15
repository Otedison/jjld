import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Clock3, MapPin, ArrowRight } from "lucide-react";
import { getCareers } from "@/lib/api";
import { formatDate } from "@/lib/format";

const Careers = () => {
  const { data: careers = [], isLoading, isError } = useQuery({
    queryKey: ["careers", "all", "page"],
    queryFn: () => getCareers(100, "all"),
  });

  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Work With Us</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Careers</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Open opportunities from our local database.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container">
          {isLoading && <p className="text-muted-foreground">Loading careers from localhost...</p>}

          {!isLoading && !isError && careers.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map((career) => (
                <article key={career._id} className="bg-background border rounded-lg shadow-card hover:shadow-card-hover overflow-hidden">
                  <img
                    src={career.coverImageUrl || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"}
                    alt={career.title}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-xs font-heading font-semibold uppercase">{career.employmentType}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{career.title}</h3>
                    {career.referenceNumber && <p className="text-xs font-medium text-primary mb-2">Ref: {career.referenceNumber}</p>}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {career.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5" />
                        Deadline: {formatDate(career.deadline)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{career.description}</p>
                    <Link to={`/careers/${career._id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                      View Details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!isLoading && (isError || careers.length === 0) && (
            <p className="text-muted-foreground">No jobs yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;
