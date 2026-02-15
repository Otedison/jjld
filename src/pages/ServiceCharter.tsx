import { Download, CheckCircle, Clock, Users, FileText, Shield, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const commitments = [
  { icon: Users, title: "Citizen-Centred Service", desc: "All programmes are designed with and for citizens, ensuring accessibility regardless of gender, age, disability, ethnicity, or location." },
  { icon: Clock, title: "Timely Delivery", desc: "Civic education forums held within published schedules. Resources distributed within 14 working days of request." },
  { icon: Shield, title: "Quality & Accuracy", desc: "All materials are reviewed for constitutional accuracy, non-partisanship, and cultural sensitivity before publication." },
  { icon: MessageSquare, title: "Responsive Communication", desc: "All enquiries acknowledged within 48 hours. Complaints resolved within 14 working days." },
  { icon: FileText, title: "Transparency & Reporting", desc: "Annual reports published detailing reach, impact, expenditure, and lessons learned." },
  { icon: CheckCircle, title: "Accountability & Feedback", desc: "Citizens can rate our services. Feedback shapes programme improvements continuously." },
];

const ServiceCharter = () => {
  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Our Commitment</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">
            Our Promise to the People of Kenya
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mb-6">
            The Jukwaa La Demokrasia Service Charter outlines our commitments, standards, and accountability mechanisms in delivering civic education across all 47 counties.
          </p>
          <div className="flex gap-3">
            <Button variant="hero-primary" size="lg">
              <Download className="h-4 w-4 mr-2" /> Download PDF (English)
            </Button>
            <Button variant="hero" size="lg">
              <Download className="h-4 w-4 mr-2" /> Pakua (Kiswahili)
            </Button>
          </div>
        </div>
      </section>

      {/* Key Commitments */}
      <section className="py-20 bg-background">
        <div className="site-container">
          <h2 className="text-section-sm md:text-section text-foreground text-center mb-12">Key Commitments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {commitments.map((c) => (
              <div key={c.title} className="bg-background border rounded-lg p-6 shadow-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charter Content */}
      <section className="py-20 bg-muted">
        <div className="site-container">
          <div className="max-w-3xl mx-auto bg-background rounded-xl p-8 md:p-12 shadow-card border">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-8 pb-4 border-b">Service Charter — Full Text</h2>

            <div className="space-y-8 text-foreground">
              <div>
                <h3 className="font-heading font-bold text-lg text-primary mb-3">1. Introduction</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Jukwaa La Demokrasia is a non-partisan civic education organisation committed to empowering Kenyan citizens with the knowledge, skills, and attitudes necessary for active participation in democratic governance. This Service Charter sets out our commitments to the people of Kenya, the standards by which we operate, and the mechanisms through which citizens can hold us accountable.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-primary mb-3">2. Our Mandate</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Our mandate derives from the Constitution of Kenya (2010), the County Government Act (2012) — specifically Section 98 on civic education — and Kenya Vision 2030. We are established to bridge the gap between governance institutions and citizens through comprehensive, accessible, and culturally relevant civic education programmes.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-primary mb-3">3. Our Services</h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-3">We deliver six core programmes:</p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 pl-2">
                  <li>Comprehensive Civic Education</li>
                  <li>Public Finance & Budget Literacy</li>
                  <li>Elections & Political Participation</li>
                  <li>Public Policy & Legislative Engagement</li>
                  <li>Sector-Specific Governance Education</li>
                  <li>Leadership Development</li>
                </ol>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-primary mb-3">4. Service Standards</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="text-left p-3 font-heading font-semibold border">Service</th>
                        <th className="text-left p-3 font-heading font-semibold border">Standard</th>
                        <th className="text-left p-3 font-heading font-semibold border">Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr><td className="p-3 border">Civic education forums</td><td className="p-3 border">Minimum 4 per county per year</td><td className="p-3 border">Quarterly</td></tr>
                      <tr><td className="p-3 border">Resource distribution</td><td className="p-3 border">Materials in English & Kiswahili</td><td className="p-3 border">Within 14 days</td></tr>
                      <tr><td className="p-3 border">Complaint resolution</td><td className="p-3 border">Acknowledgement + resolution</td><td className="p-3 border">48hrs / 14 days</td></tr>
                      <tr><td className="p-3 border">Annual reporting</td><td className="p-3 border">Published impact report</td><td className="p-3 border">Within Q1</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-primary mb-3">5. Citizens' Rights</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Access civic education services free of charge.</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Receive accurate, non-partisan, and culturally appropriate information.</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Provide feedback, lodge complaints, and receive timely responses.</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> Participate in programme design and evaluation.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg text-primary mb-3">6. Feedback & Complaints</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We welcome feedback as a tool for continuous improvement. Citizens may submit compliments, suggestions, or complaints via email, phone, WhatsApp, or in person at any county office. All complaints are logged, investigated, and resolved within 14 working days.
                </p>
              </div>

              <div className="bg-secondary/5 rounded-lg p-6 border-l-4 border-secondary">
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">Our Pledge</h3>
                <p className="text-sm leading-relaxed text-foreground italic">
                  "We, the team at Jukwaa La Demokrasia, pledge to serve the people of Kenya with integrity, transparency, and dedication. We commit to empowering every citizen — regardless of their background — with the knowledge and skills to participate fully in the democratic governance of our nation. We hold ourselves accountable to this Charter and to the people we serve."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form Placeholder */}
      <section className="py-16 bg-background">
        <div className="site-container text-center max-w-xl">
          <h2 className="font-heading font-bold text-xl text-foreground mb-4">How Are We Doing?</h2>
          <p className="text-sm text-muted-foreground mb-6">Rate our service and help us improve.</p>
          <div className="flex justify-center gap-2 mb-6">
            {["😟", "😐", "🙂", "😊", "🤩"].map((emoji, i) => (
              <button key={i} className="w-12 h-12 text-2xl bg-muted rounded-lg hover:bg-primary/10 transition-colors" aria-label={`Rate ${i + 1}`}>
                {emoji}
              </button>
            ))}
          </div>
          <Button variant="kenya-green">Submit Feedback</Button>
        </div>
      </section>
    </div>
  );
};

export default ServiceCharter;
