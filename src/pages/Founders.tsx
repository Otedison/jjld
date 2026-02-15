import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { founders } from "@/data/founders";

const Founders = () => {
  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Who We Are</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Our Founders</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Meet the leaders behind Jukwaa La Demokrasia and the vision driving democratic participation in Kenya.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {founders.map((founder) => (
              <article key={founder.slug} className="bg-background border rounded-lg shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
                <img src={founder.image} alt={founder.name} className="w-full h-72 object-cover" loading="lazy" />
                <div className="p-8">
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-1">{founder.name}</h2>
                  <p className="text-primary font-heading font-semibold mb-4">{founder.role}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{founder.shortBio}</p>
                  <Button asChild variant="outline">
                    <Link to={`/about/founders/${founder.slug}`}>Read More</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Founders;
