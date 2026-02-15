import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Landmark,
  Vote,
  Building2,
  Users,
  Calendar,
  Quote,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEvents, getHomepageAd, getNews, isDev } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import heroImage from "@/assets/hero-civic.jpg";
import SubscribeCta from "@/components/SubscribeCta";

const programmes = [
  {
    icon: BookOpen,
    title: "Comprehensive Civic Education",
    desc: "Empowering citizens with knowledge of their constitutional rights, governance structures, and civic responsibilities.",
    color: "bg-primary",
    image:
      "https://images.unsplash.com/photo-1551817958-20204d6abeb1?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Landmark,
    title: "Public Finance & Budget Literacy",
    desc: "Teaching citizens to track, understand, and influence public budgets at county and national levels.",
    color: "bg-secondary",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Vote,
    title: "Elections & Political Participation",
    desc: "Promoting free, fair, and informed participation in electoral processes across all 47 counties.",
    color: "bg-primary",
    image:
      "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: BookOpen,
    title: "Public Policy & Legislative Engagement",
    desc: "Equipping citizens to engage meaningfully in policy formulation and legislative processes.",
    color: "bg-secondary",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Building2,
    title: "Sector-Specific Governance",
    desc: "Targeted education on governance in water, health, agriculture, education, and other devolved sectors.",
    color: "bg-primary",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: Users,
    title: "Leadership Development",
    desc: "Building ethical, accountable, and transformative leaders at community and county levels.",
    color: "bg-secondary",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
];

const stats = [
  { value: "500,000+", label: "Citizens Reached" },
  { value: "47", label: "Counties Covered" },
  { value: "200+", label: "Leaders Trained" },
  { value: "6", label: "Core Programmes" },
];

const testimonials = [
  {
    name: "Amina Wanjiku",
    county: "Nairobi",
    quote:
      "Jukwaa La Demokrasia taught me that my voice matters. I now actively participate in county budget forums and hold leaders accountable.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Peter Odhiambo",
    county: "Kisumu",
    quote:
      "The civic education sessions transformed our community. We now understand our rights under the Constitution and how to demand better services.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Fatuma Hassan",
    county: "Garissa",
    quote:
      "As a woman leader, the Leadership Academy gave me the confidence and skills to advocate for my community's needs at the county assembly.",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
  },
];

const partners = [
  {
    name: "National Youth Council",
    logo: "https://placehold.co/240x96/ffffff/1f2937?text=National+Youth+Council",
  },
  {
    name: "Kenya Human Rights Network",
    logo: "https://placehold.co/240x96/ffffff/1f2937?text=Kenya+Human+Rights+Network",
  },
  {
    name: "County Assemblies Support Program",
    logo: "https://placehold.co/240x96/ffffff/1f2937?text=County+Assemblies+Support",
  },
  {
    name: "Open Governance Lab",
    logo: "https://placehold.co/240x96/ffffff/1f2937?text=Open+Governance+Lab",
  },
  {
    name: "Citizen Media Collective",
    logo: "https://placehold.co/240x96/ffffff/1f2937?text=Citizen+Media+Collective",
  },
  {
    name: "Devolution Accountability Forum",
    logo: "https://placehold.co/240x96/ffffff/1f2937?text=Devolution+Accountability+Forum",
  },
];

const Index = () => {
  const { t } = useI18n();
  
  const { data: latestNewsStories = [], isError: newsError, error: newsErrorObj } = useQuery({
    queryKey: ["news", "homepage", 12],
    queryFn: () => getNews(12),
  });

  const { data: events = [], isError: eventsError, error: eventsErrorObj } = useQuery({
    queryKey: ["events", "homepage", 3],
    queryFn: () => getEvents(3, true),
  });
  const { data: homepageAd } = useQuery({
    queryKey: ["ads", "homepage-sidebar"],
    queryFn: () => getHomepageAd(),
  });
  const eventsGrid = Array.from({ length: 4 }, (_, index) => events[index] ?? null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Kenyan citizens participating in a civic engagement meeting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero-dark" />
          <div className="absolute inset-0 gradient-hero opacity-40" />
        </div>
        <div className="relative site-container py-20">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-6 text-balance font-heading">
              Empowering Citizens, Strengthening Democracy, Transforming Kenya
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed font-body">
              Jukwaa La Demokrasia provides non-partisan civic education and ethical leadership development to citizens
              across all 47 counties.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero-primary" size="lg">
                <Link to="/programmes">Explore Our Programmes</Link>
              </Button>
              <Button asChild variant="hero" size="lg">
                <Link to="/service-charter">Read Our Service Charter</Link>
              </Button>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 stagger-children">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-5 text-center border border-primary-foreground/20"
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-muted border-y">
        <div className="site-container">
          <p className="text-center text-sm text-muted-foreground font-heading font-medium mb-6 uppercase tracking-wider">
            Our Partners
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-background border rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-card transition-shadow"
              >
                <img src={partner.logo} alt={partner.name} className="h-12 w-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Programmes */}
      <section className="py-20 bg-background">
        <div className="site-container">
          <div className="text-center mb-14">
            <h2 className="text-section-sm md:text-section text-foreground mb-4">Our Core Programmes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Six transformative programmes designed to strengthen democratic governance and empower citizens across
              Kenya.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {programmes.map((prog) => (
              <div key={prog.title} className="bg-background border rounded-lg shadow-card hover:shadow-card-hover transition-shadow group overflow-hidden">
                <img src={prog.image} alt={prog.title} className="w-full h-40 object-cover" loading="lazy" />
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${prog.color} text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <prog.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{prog.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{prog.desc}</p>
                  <Link to="/programmes" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Civic Education Matters */}
      <section className="py-20 bg-muted">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary mb-3 block">
                Kila Mwananchi Mjuzi
              </span>
              <h2 className="text-section-sm md:text-section text-foreground mb-6">Why Civic Education Matters</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Constitution of Kenya (2010) guarantees every citizen the right to participate in governance. Yet,
                many Kenyans remain unaware of their rights, how public resources are managed, or how to hold leaders
                accountable.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Informed citizens make better decisions at the ballot",
                  "Budget literacy ensures public funds serve the people",
                  "Civic knowledge strengthens devolution and service delivery",
                  "Active participation builds trust between leaders and citizens",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="kenya-green" size="lg">
                <Link to="/service-charter">Read Our Service Charter</Link>
              </Button>
            </div>
            <div className="bg-background rounded-xl p-8 shadow-card border">
              <Quote className="h-10 w-10 text-primary/20 mb-4" />
              <blockquote className="text-lg text-foreground italic leading-relaxed mb-4">
                "Sovereignty belongs to the people of Kenya and shall be exercised only in accordance with this
                Constitution."
              </blockquote>
              <cite className="text-sm text-muted-foreground not-italic font-semibold">
                — Article 1, Constitution of Kenya (2010)
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News and Stories */}
      <section className="py-20 bg-background">
        <div className="site-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-section-sm md:text-section text-foreground mb-2">Latest News & Stories</h2>
              <p className="text-muted-foreground">Fresh updates and impact stories from communities across Kenya.</p>
            </div>
            <Link to="/news" className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {newsError ? (
            <div className="text-muted-foreground">
              <p>{t("ui.noPostsYet")}</p>
              {isDev && newsErrorObj && (
                <p className="text-xs text-red-400 mt-2">Error: {newsErrorObj.message}</p>
              )}
            </div>
          ) : latestNewsStories.length === 0 ? (
            <p className="text-muted-foreground">{t("ui.noPostsYet")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNewsStories.slice(0, 3).map((item) => (
                <article key={item._id} className="h-full bg-background border rounded-lg shadow-card hover:shadow-card-hover transition-shadow overflow-hidden group">
                  <img
                    src={item.coverImageUrl || "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=900&q=80"}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-primary">
                        {(item.contentType || "blog").toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatDate(item.publishedAt || item.createdAt)}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2 leading-snug">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.excerpt || item.content.slice(0, 120)}...</p>
                    <Link to={`/news/${item.slug}`} className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                      Read Story <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-muted">
        <div className="site-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-section-sm md:text-section text-foreground mb-2">Upcoming Events</h2>
              <p className="text-muted-foreground">Join civic education forums and training sessions near you.</p>
            </div>
            <Link to="/news" className="hidden md:flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Full Calendar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {eventsError && <p className="text-muted-foreground mb-4">{t("ui.noEventsYet")}</p>}
              <div className="grid md:grid-cols-2 gap-6">
                {eventsGrid.map((evt, index) => (
                  <div
                    key={evt?._id || `event-placeholder-${index}`}
                    className={`rounded-lg p-6 transition-shadow ${
                      evt
                        ? "bg-background border shadow-card hover:shadow-card-hover"
                        : "bg-background/70 border border-dashed"
                    }`}
                  >
                    {evt ? (
                      <>
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold text-primary font-heading">{formatDate(evt.startAt)}</span>
                        </div>
                        <h3 className="font-heading font-semibold text-foreground mb-2">{evt.title}</h3>
                        <p className="text-sm text-muted-foreground">{evt.description}</p>
                        <Link to={`/events/${evt.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                          Event Details <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link to={`/events/${evt.slug}/register`} className="mt-2 ml-3 inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:underline">
                          Register
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs font-semibold text-muted-foreground font-heading">Coming Soon</span>
                        </div>
                        <h3 className="font-heading font-semibold text-foreground mb-2">New Event Slot</h3>
                        <p className="text-sm text-muted-foreground">Upcoming civic forums and workshops will appear here.</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <aside className="bg-background border rounded-lg p-4 shadow-card h-fit">
              <p className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Advertisement
              </p>
              {homepageAd?.imageUrl ? (
                homepageAd.targetUrl ? (
                  <a href={homepageAd.targetUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={homepageAd.imageUrl}
                      alt={homepageAd.altText || homepageAd.title || "Advertisement"}
                      className="w-full rounded-md object-cover"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <img
                    src={homepageAd.imageUrl}
                    alt={homepageAd.altText || homepageAd.title || "Advertisement"}
                    className="w-full rounded-md object-cover"
                    loading="lazy"
                  />
                )
              ) : (
                <img
                  src="https://placehold.co/400x520/e5e7eb/374151?text=Advertisement+Space"
                  alt="Advertisement placeholder"
                  className="w-full rounded-md object-cover"
                  loading="lazy"
                />
              )}
              <p className="text-xs text-muted-foreground mt-3">Promote your civic event or campaign here.</p>
            </aside>
          </div>
          <div className="mt-8 max-w-3xl">
            <SubscribeCta
              source="homepage-events-cta"
              title="Subscribe for Event Alerts"
              description="Never miss civic forums, trainings, and county sessions. Get notified when new events are posted."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="site-container">
          <div className="text-center mb-14">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-primary mb-3 block">
              Sauti Yako, Nguvu Yako
            </span>
            <h2 className="text-section-sm md:text-section text-foreground mb-4">Voices from the Community</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-background border rounded-lg p-6 shadow-card">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.county} County</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/5">
        <div className="site-container text-center">
          <h2 className="text-section-sm md:text-section text-foreground mb-4">
            Democracy is not finished - it continues with you!
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto italic font-heading">
            "Hamuko na Demokrasia - Inaendelea na Wewe!"
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="hero-primary" size="lg">
              <Link to="/get-involved#volunteer">Volunteer</Link>
            </Button>
            <Button asChild variant="kenya-green" size="lg">
              <Link to="/get-involved#partner">Partner with Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/get-involved#academy">Leadership Academy</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
