import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { createSubscription } from "@/lib/api";

type SubscribeCtaProps = {
  title?: string;
  description?: string;
  source?: string;
  compact?: boolean;
};

const SubscribeCta = ({
  title = "Stay Updated",
  description = "Get civic updates, event announcements, and new stories in your inbox.",
  source = "cta",
  compact = false,
}: SubscribeCtaProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setFeedback({ type: "error", text: "Please enter your email." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);
    try {
      await createSubscription({ email: normalizedEmail, source });
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
    <div className={`rounded-xl border bg-background ${compact ? "p-5" : "p-7 md:p-8"} shadow-card`}>
      <h3 className={`${compact ? "text-lg" : "text-2xl"} font-heading font-semibold text-foreground mb-2`}>{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          className="flex-1 rounded-md border px-3 py-2.5 text-sm"
          required
          aria-label="Subscription email"
        />
        <Button type="submit" disabled={isSubmitting}>
          Subscribe
        </Button>
      </form>
      {feedback && (
        <p className={`mt-2 text-xs ${feedback.type === "success" ? "text-secondary" : "text-destructive"}`}>{feedback.text}</p>
      )}
    </div>
  );
};

export default SubscribeCta;
