import { Heart, Handshake, GraduationCap, Award, ArrowRight, Briefcase, MapPin, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCareers } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { Link } from "react-router-dom";

const opportunities = [
  {
    id: "volunteer",
    icon: Heart,
    title: "Volunteer",
    subtitle: "Lend Your Voice to Democracy",
    desc: "Join our network of civic champions across 47 counties. Volunteers help facilitate community forums, distribute educational materials, and mobilise citizens for public participation events.",
    requirements: ["Kenyan citizen aged 18+", "Commitment of at least 10 hours/month", "Passion for civic engagement and community service"],
  },
  {
    id: "partner",
    icon: Handshake,
    title: "Partner with Us",
    subtitle: "Collaborate for Impact",
    desc: "We welcome partnerships with civil society organisations, government agencies, development partners, academic institutions, and private sector companies committed to strengthening democracy in Kenya.",
    requirements: ["Shared commitment to non-partisan civic education", "Aligned values of transparency and accountability", "Willingness to co-design and co-deliver programmes"],
  },
  {
    id: "internships",
    icon: GraduationCap,
    title: "Internships",
    subtitle: "Build Your Career in Governance",
    desc: "Our internship programme offers university students and recent graduates hands-on experience in civic education, programme management, communications, research, and community engagement.",
    requirements: ["Currently enrolled or recently graduated from a recognised institution", "Strong interest in governance, law, or social sciences", "Minimum 3-month commitment"],
  },
  {
    id: "academy",
    icon: Award,
    title: "Leadership Academy",
    subtitle: "Become a Transformative Leader",
    desc: "The Jukwaa Leadership Academy is an intensive 6-month programme that develops ethical, accountable, and innovative civic leaders. Applications are merit-based and transparent.",
    requirements: ["Community leadership experience", "Nomination by a community or county organisation", "Commitment to a 6-month programme with mentorship"],
  },
];

const GetInvolved = () => {
  const { t } = useI18n();
  const { data: careers = [], isLoading, isError } = useQuery({
    queryKey: ["careers", "open"],
    queryFn: () => getCareers(20, "open"),
  });

  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Join the Movement</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Get Involved</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Democracy thrives when citizens participate. There are many ways to contribute to the strengthening of democratic governance in Kenya.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container space-y-20">
          {opportunities.map((opp, i) => (
            <div key={opp.id} id={opp.id} className="scroll-mt-24">
              <div className={`grid lg:grid-cols-2 gap-10 items-start`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`w-14 h-14 rounded-xl ${i % 2 === 0 ? "bg-primary" : "bg-secondary"} text-primary-foreground flex items-center justify-center mb-5`}>
                    <opp.icon className="h-7 w-7" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-1">{opp.title}</h2>
                  <p className="text-sm text-primary font-heading font-semibold mb-4">{opp.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{opp.desc}</p>
                  <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Requirements</h4>
                  <ul className="space-y-2 mb-6">
                    {opp.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`bg-muted rounded-xl p-8 border ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Apply Now</h3>
                  <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                      <input type="text" className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                      <input type="email" className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">County *</label>
                      <input type="text" className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Why do you want to join? *</label>
                      <textarea rows={3} className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" required />
                    </div>
                    <Button type="submit" variant={i % 2 === 0 ? "hero-primary" : "kenya-green"} className="w-full">
                      Submit Application
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ))}

          <div id="careers" className="scroll-mt-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-1">Open Careers</h2>
                <p className="text-muted-foreground">Live roles fetched from your localhost database.</p>
              </div>
            </div>

            {isLoading && <p className="text-muted-foreground">Loading careers from localhost...</p>}

            {!isLoading && !isError && careers.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {careers.map((career) => (
                  <div key={career._id} className="bg-background border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-xs font-heading font-semibold uppercase">{career.employmentType}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{career.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{career.location}</span>
                      <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />Deadline: {formatDate(career.deadline)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{career.description}</p>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/careers/${career._id}`}>View Details</Link>
                      </Button>
                      {career.applicationUrl ? (
                        <Button asChild variant="outline" size="sm">
                          <a href={career.applicationUrl} target="_blank" rel="noopener noreferrer">Apply</a>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>No link yet</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && (isError || careers.length === 0) && (
              <p className="text-muted-foreground">{t("ui.noJobsYet")}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
