import { Shield, Eye, Heart, Scale, HandHeart, Lightbulb, Target, Users } from "lucide-react";

const values = [
  { icon: Shield, name: "Integrity (Uadilifu)", desc: "We uphold the highest ethical standards in all our work." },
  { icon: Eye, name: "Transparency (Uwazi)", desc: "We operate openly, making information accessible to all." },
  { icon: Users, name: "Participation (Ushiriki)", desc: "We believe in inclusive, meaningful citizen engagement." },
  { icon: Scale, name: "Justice (Haki)", desc: "We champion fairness, equity, and the rule of law." },
  { icon: HandHeart, name: "Respect (Heshima)", desc: "We value the dignity of every person and community." },
  { icon: Target, name: "Accountability (Uwajibikaji)", desc: "We answer to the citizens we serve and the standards we set." },
  { icon: Lightbulb, name: "Innovation (Ubunifu)", desc: "We embrace creative, evidence-based approaches to civic education." },
  { icon: Heart, name: "Patriotism (Uzalendo)", desc: "We are committed to the prosperity and unity of Kenya." },
];

const boardMembers = [
  { name: "Dr. Sarah Nyambura", title: "Board Chairperson", desc: "Constitutional law scholar with 20+ years in governance." },
  { name: "Prof. James Otieno", title: "Vice Chairperson", desc: "Expert in public administration and devolution studies." },
  { name: "Halima Abdi", title: "Board Member", desc: "Women's rights advocate and community development specialist." },
  { name: "David Kimani", title: "Board Member", desc: "Former county executive with expertise in public finance." },
  { name: "Grace Akinyi", title: "Board Member", desc: "Youth leadership mentor and civic technology innovator." },
  { name: "Hassan Mwangi", title: "Treasurer", desc: "Certified public accountant with NGO governance experience." },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Who We Are</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">
            Championing Democratic Governance in Kenya
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Jukwaa La Demokrasia is a non-partisan civic education organization empowering citizens to participate actively in democratic governance.
          </p>
        </div>
      </section>

      {/* Mandate */}
      <section className="py-20 bg-background" id="mandate">
        <div className="site-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-section-sm md:text-section text-foreground mb-6">Our Mandate</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Jukwaa La Demokrasia draws its mandate from the Constitution of Kenya (2010), the County Government Act (2012), and Kenya Vision 2030. We are established to provide comprehensive civic education that enables every Kenyan to understand their rights, participate in governance, and demand accountability from public institutions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Section 98 of the County Government Act mandates civic education as essential to public participation. We fulfil this mandate through targeted programmes that reach citizens in all 47 counties, with special focus on marginalised communities, youth, women, and persons with disabilities.
            </p>
            <div className="bg-muted rounded-lg p-6 border-l-4 border-primary mt-8">
              <p className="text-foreground italic">
                "The objects of the devolution of government are to promote democratic and accountable exercise of power; to give powers of self-governance to the people; and to protect and promote the interests and rights of minorities and marginalised communities."
              </p>
              <cite className="text-sm text-muted-foreground not-italic mt-2 block">— Article 174, Constitution of Kenya</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted">
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-background rounded-lg p-8 shadow-card border">
              <h3 className="font-heading font-bold text-xl text-primary mb-4">Our Vision</h3>
              <p className="text-foreground leading-relaxed">
                A Kenya where every citizen is an informed, active, and empowered participant in democratic governance — ensuring accountability, justice, and equitable development for all.
              </p>
            </div>
            <div className="bg-background rounded-lg p-8 shadow-card border">
              <h3 className="font-heading font-bold text-xl text-secondary mb-4">Our Mission</h3>
              <p className="text-foreground leading-relaxed">
                To provide accessible, high-quality, non-partisan civic education and leadership development that transforms citizens into active participants in Kenya's democratic processes.
              </p>
            </div>
          </div>

          <h2 className="text-section-sm md:text-section text-foreground text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v) => (
              <div key={v.name} className="bg-background rounded-lg p-5 text-center shadow-card border hover:shadow-card-hover transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-sm text-foreground mb-1">{v.name}</h4>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="py-20 bg-background" id="board">
        <div className="site-container">
          <h2 className="text-section-sm md:text-section text-foreground text-center mb-12">Board of Directors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {boardMembers.map((m) => (
              <div key={m.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 text-foreground font-heading font-bold text-xl">
                  {m.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                </div>
                <h4 className="font-heading font-semibold text-sm text-foreground">{m.name}</h4>
                <p className="text-xs text-primary font-semibold mb-1">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
