import { Mail, Phone, MessageCircle, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const countyRegions = [
  { region: "Nairobi & Central", counties: ["Nairobi", "Kiambu", "Murang'a", "Nyeri", "Kirinyaga", "Nyandarua"] },
  { region: "Coast", counties: ["Mombasa", "Kilifi", "Kwale", "Taita-Taveta", "Tana River", "Lamu"] },
  { region: "Western & Nyanza", counties: ["Kisumu", "Siaya", "Homa Bay", "Migori", "Kakamega", "Bungoma", "Busia", "Vihiga"] },
  { region: "Rift Valley", counties: ["Nakuru", "Uasin Gishu", "Nandi", "Kericho", "Bomet", "Baringo", "Elgeyo-Marakwet", "Trans Nzoia", "West Pokot", "Turkana", "Samburu"] },
  { region: "Eastern & North Eastern", counties: ["Meru", "Embu", "Tharaka-Nithi", "Machakos", "Kitui", "Makueni", "Isiolo", "Marsabit", "Garissa", "Wajir", "Mandera"] },
];

const Contact = () => {
  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Get in Touch</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Contact Us</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            We are present in all 47 counties. Reach out to our national office or find your county coordinator below.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">National Office</h2>
              <div className="space-y-4 mb-8">
                {[
                  { icon: MapPin, label: "Jukwaa La Demokrasia House, Kenyatta Avenue, Nairobi, Kenya" },
                  { icon: Mail, label: "info@jukwaalademokrasia.org" },
                  { icon: Phone, label: "+254 710 730032" },
                  { icon: MessageCircle, label: "0743653115 (WhatsApp)" },
                  { icon: Clock, label: "Mon – Fri, 8:00 AM – 5:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mb-8">
                <h3 className="font-heading font-semibold text-foreground mb-2">Media Inquiries</h3>
                <p className="text-sm text-muted-foreground">info@jukwaalademokrasia.org</p>
              </div>
              {/* Map Placeholder */}
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center border">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Interactive Map</p>
                  <p className="text-xs">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Send Us a Message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                    <input type="text" className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                    <input type="email" className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                    <input type="tel" className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">County</label>
                    <select className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select County</option>
                      {countyRegions.flatMap((r) => r.counties).sort().map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category *</label>
                  <select className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required>
                    <option value="">Select Category</option>
                    <option value="general">General Inquiry</option>
                    <option value="complaint">Complaint</option>
                    <option value="compliment">Compliment</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="media">Media Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
                  <textarea rows={5} className="w-full px-3 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" required />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="anonymous" className="rounded border" />
                  <label htmlFor="anonymous" className="text-sm text-muted-foreground">Submit anonymously</label>
                </div>
                <Button type="submit" variant="hero-primary" size="lg" className="w-full">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* County Offices */}
      <section className="py-20 bg-muted" id="county-offices">
        <div className="site-container">
          <h2 className="text-section-sm md:text-section text-foreground text-center mb-12">County Presence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {countyRegions.map((r) => (
              <div key={r.region} className="bg-background rounded-lg p-6 shadow-card border">
                <h3 className="font-heading font-semibold text-foreground mb-3">{r.region}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {r.counties.map((c) => (
                    <span key={c} className="text-xs bg-muted text-foreground px-2 py-1 rounded">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
