import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { createSubscription } from "@/lib/api";

const Footer = () => {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setFeedback({ type: "error", text: "Please enter your email." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await createSubscription({ email: normalizedEmail, source: "footer" });
      setFeedback({ type: "success", text: "Subscribed successfully." });
      setEmail("");
    } catch (error) {
      setFeedback({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-green-800 text-primary-foreground no-print">
      <div className="site-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src="/jukwaaa.png" 
                alt="Jukwaa La Demokrasia Logo"
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to original logo if image fails to load
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center" style={{ display: 'none' }}>
                <div className="w-5 h-5 rounded-full border-2 border-primary-foreground flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
              </div>
              <span className="font-heading font-bold text-lg">Jukwaa La Demokrasia</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">{t("footer.tagline")}</p>
            <p className="text-primary-foreground/50 text-xs italic">"Hamuko na Demokrasia - Inaendelea na Wewe!"</p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-base mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2.5">
              {[
                { label: t("nav.home"), href: "/" },
                { label: t("nav.programmes"), href: "/programmes" },
                { label: t("nav.resources"), href: "/resources" },
                { label: t("nav.serviceCharter"), href: "/service-charter" },
                { label: t("nav.getInvolved"), href: "/get-involved" },
                { label: t("footer.contactUs"), href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-base mb-4">{t("footer.contactUs")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>info@jukwaalademokrasia.org</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+254 710 730032</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MessageCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>0743653115 ({t("footer.whatsapp")})</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-base mb-4">{t("footer.stayUpdated")}</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">{t("footer.subscribeText")}</p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder={t("footer.yourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Email for newsletter"
                required
              />
              <Button type="submit" size="sm" disabled={isSubmitting}>
                {t("footer.subscribe")}
              </Button>
            </form>
            {feedback && (
              <p className={`mt-2 text-xs ${feedback.type === "success" ? "text-secondary" : "text-destructive"}`}>
                {feedback.text}
              </p>
            )}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Twitter, href: "https://twitter.com/JukwaaDemokrasia" },
                { icon: Facebook, href: "https://facebook.com/JukwaaLaDemokrasiaKenya" },
                { icon: Instagram, href: "https://instagram.com/jukwaademokrasia" },
                { icon: Youtube, href: "https://youtube.com/c/JukwaaLaDemokrasia" },
                { icon: Linkedin, href: "https://linkedin.com/company/jukwaa-la-demokrasia" },
              ].map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="site-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Jukwaa La Demokrasia. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors">{t("footer.privacy")}</Link>
            <Link to="/terms" className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
