import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { founders } from "@/data/founders";

const FounderProfile = () => {
  const { slug } = useParams();
  const founder = founders.find((item) => item.slug === slug);

  if (!founder) {
    return (
      <div className="bg-background py-24">
        <div className="site-container text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Founder not found</h1>
          <Button asChild variant="outline">
            <Link to="/about/founders">Back to Founders</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Who We Are</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-3 font-heading">{founder.name}</h1>
          <p className="text-primary-foreground/80 text-lg">{founder.role}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img src={founder.image} alt={founder.name} className="w-full rounded-lg border object-cover" loading="lazy" />
            <div>
              <p className="text-muted-foreground leading-relaxed mb-8">{founder.fullBio}</p>
              <Button asChild variant="outline">
                <Link to="/about/founders">Back to Founders</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FounderProfile;
