import { Link } from "react-router-dom";
import { BadgeCheck, BriefcaseBusiness, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Civic Education Program Design",
    description: "We design practical civic learning programs for counties, institutions, and development partners.",
    icon: Users,
  },
  {
    title: "Governance & Public Policy Advisory",
    description: "We support evidence-based policy development, governance audits, and implementation planning.",
    icon: FileText,
  },
  {
    title: "Institutional Capacity Building",
    description: "We train teams on public participation, accountability systems, and democratic leadership.",
    icon: BadgeCheck,
  },
  {
    title: "Strategic Partnerships Support",
    description: "We help organizations structure collaborations that deliver measurable social and governance impact.",
    icon: BriefcaseBusiness,
  },
];

const Consultancy = () => {
  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Jukwaa Services</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Consultancy Services</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Advisory and implementation support in civic education, governance, policy engagement, and democratic leadership.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <article key={service.title} className="rounded-xl border bg-card p-6 shadow-card hover:shadow-card-hover transition-shadow">
                <service.icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-heading text-xl mb-2 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-xl border bg-muted/40 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-heading text-foreground mb-2">Need a tailored consultancy package?</h2>
              <p className="text-muted-foreground">Tell us your goals and context, and we will propose a focused support plan.</p>
            </div>
            <Button asChild variant="hero-primary">
              <Link to="/contact">Request Consultancy</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultancy;
