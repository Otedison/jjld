import { Link } from "react-router-dom";
import { BookOpen, Landmark, Vote, FileText, Building2, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const programmes = [
  {
    icon: BookOpen,
    title: "Comprehensive Civic Education",
    slug: "civic-education",
    desc: "Our flagship programme empowers citizens with knowledge of the Constitution, Bill of Rights, governance structures, and their role in democracy. We conduct community forums, school outreach, and media campaigns to ensure every Kenyan understands their civic duties and rights.",
    highlights: ["Constitutional rights awareness", "Community governance forums", "Citizen participation training", "Youth civic mentorship"],
  },
  {
    icon: Landmark,
    title: "Public Finance & Budget Literacy",
    slug: "public-finance",
    desc: "We demystify county and national budgets, teaching citizens how to read budget documents, participate in public budget forums, and track how public funds are allocated and spent. Our motto: Kufuatisha Pesa — Follow the Money.",
    highlights: ["Budget tracking training", "County budget forums", "Revenue allocation education", "Expenditure monitoring"],
  },
  {
    icon: Vote,
    title: "Elections & Political Participation",
    slug: "elections",
    desc: "We promote informed, peaceful, and inclusive participation in electoral processes. From voter registration drives to candidate forums, we help citizens make choices based on issues rather than identity.",
    highlights: ["Voter education drives", "Candidate accountability forums", "Election monitoring training", "Political party engagement"],
  },
  {
    icon: FileText,
    title: "Public Policy & Legislative Engagement",
    slug: "policy",
    desc: "We equip citizens with skills to engage in policy-making processes at both county and national levels. From understanding how bills become law to submitting memoranda, we bridge the gap between citizens and legislation.",
    highlights: ["Policy analysis workshops", "Legislative tracking", "Public participation in lawmaking", "Memoranda writing skills"],
  },
  {
    icon: Building2,
    title: "Sector-Specific Governance Education",
    slug: "sector-governance",
    desc: "Targeted civic education on devolved sectors including water, agriculture, health, education, roads, land, environment, youth, social protection, cooperatives, trade, energy, and public service delivery.",
    highlights: ["Water & sanitation governance", "Health sector accountability", "Education quality monitoring", "Agricultural policy engagement"],
  },
  {
    icon: Users,
    title: "Leadership Development",
    slug: "leadership",
    desc: "Our Leadership Academy builds ethical, accountable, and transformative leaders at community and county levels. We provide mentorship, training, and networking opportunities for emerging civic leaders.",
    highlights: ["Leadership Academy programme", "Mentorship & coaching", "Ethics and integrity training", "Community leadership projects"],
  },
];

const Programmes = () => {
  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">What We Do</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">
            Our Programmes
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Six transformative programmes designed to strengthen democratic governance and empower citizens across all 47 counties of Kenya.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container space-y-16">
          {programmes.map((prog, i) => (
            <div key={prog.slug} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className={`w-14 h-14 rounded-xl ${i % 2 === 0 ? "bg-primary" : "bg-secondary"} text-primary-foreground flex items-center justify-center mb-5`}>
                  <prog.icon className="h-7 w-7" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-4">{prog.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{prog.desc}</p>
                <ul className="grid grid-cols-2 gap-3 mb-6">
                  {prog.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/programmes/${prog.slug}`}>Learn More <ArrowRight className="h-4 w-4 ml-1" /></Link>
                </Button>
              </div>
              <div className={`bg-muted rounded-xl p-10 flex items-center justify-center min-h-[250px] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <prog.icon className="h-24 w-24 text-muted-foreground/20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Programmes;
