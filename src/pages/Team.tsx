import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "@/lib/api";

const Team = () => {
  const { data: teamMembers = [], isLoading, error } = useQuery({
    queryKey: ["team-members"],
    queryFn: getTeamMembers,
  });

  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Who We Are</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Our Team</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Meet the team members driving civic education, accountability, and democratic participation work across Kenya.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container">
          {isLoading && <p className="mb-6 text-sm text-muted-foreground">Loading team members...</p>}
          {error && <p className="mb-6 text-sm text-destructive">Failed to load team members.</p>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <article key={member.name} className="bg-background border rounded-lg shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
                <img
                  src={member.imageUrl || `https://placehold.co/520x620/e5e7eb/111827?text=${encodeURIComponent(member.name)}`}
                  alt={member.name}
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h2 className="font-heading font-bold text-xl text-foreground mb-1">{member.name}</h2>
                  <p className="text-primary font-heading font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio || "Bio will be updated soon."}</p>
                </div>
              </article>
            ))}
          </div>
          {!isLoading && !error && teamMembers.length === 0 && <p className="mt-6 text-sm text-muted-foreground">No team members available yet.</p>}
        </div>
      </section>
    </div>
  );
};

export default Team;
