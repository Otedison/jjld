import { FileText, Download, Search, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getResources, trackResourceDownload, createSubscription, checkSubscription } from "@/lib/api";
import { formatBytes } from "@/lib/format";
import { useI18n } from "@/lib/i18n";

const SUBSCRIPTION_KEY = "jukwaa_resource_subscribed";
const SUBSCRIBED_EMAIL_KEY = "jukwaa_resource_email";

const Resources = () => {
  const { t } = useI18n();
  const [activeType, setActiveType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string>("");
  const [isCheckingSub, setIsCheckingSub] = useState(true);

  // Check subscription status on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem(SUBSCRIBED_EMAIL_KEY);
    if (storedEmail) {
      setSubscribedEmail(storedEmail);
      checkSubscription(storedEmail)
        .then((result) => {
          setIsSubscribed(result.isSubscribed);
          if (!result.isSubscribed) {
            localStorage.removeItem(SUBSCRIPTION_KEY);
            localStorage.removeItem(SUBSCRIBED_EMAIL_KEY);
          }
        })
        .catch(() => {
          setIsSubscribed(false);
        })
        .finally(() => {
          setIsCheckingSub(false);
        });
    } else {
      setIsSubscribed(false);
      setIsCheckingSub(false);
    }
  }, []);

  const { data: resources = [], isLoading, isError } = useQuery({
    queryKey: ["resources", activeType, searchQuery],
    queryFn: () =>
      getResources({
        category: activeType,
        search: searchQuery,
      }),
    enabled: isSubscribed === true,
  });

  const handleSubscribe = async (email: string) => {
    try {
      await createSubscription({ email, source: "resources" });
      localStorage.setItem(SUBSCRIPTION_KEY, "true");
      localStorage.setItem(SUBSCRIBED_EMAIL_KEY, email.toLowerCase());
      setIsSubscribed(true);
      setSubscribedEmail(email.toLowerCase());
    } catch (error) {
      console.error("Subscription failed:", error);
      throw error;
    }
  };

  const types = useMemo(() => {
    const dynamic = [...new Set(resources.map((r) => r.category).filter(Boolean))] as string[];
    return ["All", ...dynamic];
  }, [resources]);

  const handleDownload = async (id: string, url: string) => {
    try {
      await trackResourceDownload(id, subscribedEmail);
    } catch (_error) {
      // Keep download UX intact even if tracking fails.
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Show loading while checking subscription
  if (isCheckingSub) {
    return (
      <div>
        <section className="bg-kenya-black text-primary-foreground py-20">
          <div className="site-container">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Knowledge Hub</span>
            <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Resources</h1>
          </div>
        </section>
        <section className="py-20 bg-background">
          <div className="site-container text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </section>
      </div>
    );
  }

// Show subscription form if not subscribed
  if (!isSubscribed) {
    return (
      <div>
        <section className="bg-kenya-black text-primary-foreground py-20">
          <div className="site-container">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Knowledge Hub</span>
            <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Resources</h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl">
              {t("resources.accessLibrary")}
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="site-container">
            <div className="max-w-xl mx-auto">
              <div className="bg-muted/30 border rounded-xl p-8 md:p-10 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">
                  {t("ui.subscribeToAccess")}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("ui.resourceLibraryDesc")}
                </p>
                <SubscribeForm onSubscribe={handleSubscribe} />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-kenya-black text-primary-foreground py-20">
        <div className="site-container">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-secondary mb-3 block">Knowledge Hub</span>
          <h1 className="text-hero-sm md:text-hero text-primary-foreground mb-4 max-w-3xl font-heading">Resources</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Resource library fetched directly from your local database.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="site-container">
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`text-xs font-heading font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    activeType === t ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {isLoading && <p className="text-muted-foreground">Loading resources from localhost...</p>}

          {!isLoading && !isError && resources.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((r) => (
                <div key={r._id} className="bg-background border rounded-lg p-6 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="w-full h-28 bg-muted rounded-md flex items-center justify-center mb-4">
                    <FileText className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                  <span className="text-xs font-heading font-semibold text-primary">{r.category || "Document"}</span>
                  <h3 className="font-heading font-semibold text-foreground mt-1 mb-2">{r.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span>{r.publishedYear || "-"}</span>
                    <span>·</span>
                    <span>{formatBytes(r.fileSizeBytes)}</span>
                    <span>·</span>
                    <span>{r.language || "English"}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleDownload(r._id, r.fileUrl)}>
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              ))}
            </div>
          )}

          {!isLoading && (isError || resources.length === 0) && (
            <div className="text-center py-16 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>{t("ui.noResourcesYet")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Subscribe Form Component
function SubscribeForm({ onSubscribe }: { onSubscribe: (email: string) => Promise<void> }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    
    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setFeedback({ type: "error", text: t("ui.enterValidEmail") });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    
    try {
      await onSubscribe(normalizedEmail);
      setFeedback({ type: "success", text: t("ui.subscriptionSuccess") });
    } catch (error) {
      setFeedback({
        type: "error",
        text: t("ui.subscriptionFailed"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="w-full rounded-md border px-4 py-3 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        required
        aria-label="Subscription email"
      />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? t("ui.subscribing") : t("ui.subscribeForFree")}
      </Button>
      {feedback && (
        <p className={`text-sm ${feedback.type === "success" ? "text-secondary" : "text-destructive"}`}>
          {feedback.text}
        </p>
      )}
    </form>
  );
}

export default Resources;
