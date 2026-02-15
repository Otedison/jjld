import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Briefcase, Clock3, MapPin } from "lucide-react";
import { applyForCareer, getCareerById } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";

const CareerDetail = () => {
  const { id = "" } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: career, isLoading, isError } = useQuery({
    queryKey: ["careers", "detail", id],
    queryFn: () => getCareerById(id),
    enabled: Boolean(id),
  });

  const onSubmitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!career) return;
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitMessage(null);
    try {
      await applyForCareer(career._id, {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        county: county.trim() || undefined,
        cvUrl: cvUrl.trim() || undefined,
        coverLetter: coverLetter.trim() || undefined,
      });
      setSubmitMessage("Application submitted successfully.");
      setFullName("");
      setEmail("");
      setPhone("");
      setCounty("");
      setCvUrl("");
      setCoverLetter("");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Application submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="site-container max-w-4xl">
        <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Careers
        </Link>

        {isLoading && <p className="text-muted-foreground">Loading role...</p>}
        {!isLoading && isError && <p className="text-muted-foreground">No jobs yet.</p>}
        {!isLoading && !isError && !career && <p className="text-muted-foreground">No jobs yet.</p>}

        {!isLoading && career && (
          <article className="bg-background border rounded-xl shadow-card overflow-hidden">
            <img
              src={career.coverImageUrl || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80"}
              alt={career.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-6 md:p-8">
              <h1 className="font-heading text-3xl text-foreground mb-4">{career.title}</h1>
              {career.referenceNumber && (
                <p className="mb-3 text-sm font-medium text-primary">Reference: {career.referenceNumber}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-primary" />
                  {career.employmentType}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  {career.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-4 w-4 text-primary" />
                  Deadline: {formatDate(career.deadline)}
                </span>
              </div>
              <p className="whitespace-pre-line text-foreground/90 mb-4">{career.description}</p>
              {career.requirements && (
                <>
                  <h2 className="font-heading font-semibold text-lg text-foreground mb-2">Requirements</h2>
                  <p className="whitespace-pre-line text-muted-foreground mb-6">{career.requirements}</p>
                </>
              )}

              {career.applicationUrl && (
                <div className="mb-6">
                  <Button asChild variant="outline">
                    <a href={career.applicationUrl} target="_blank" rel="noopener noreferrer">
                      Open External Application Link
                    </a>
                  </Button>
                </div>
              )}

              <div className="rounded-xl border p-4 md:p-6">
                <h2 className="font-heading font-semibold text-xl mb-4">Apply for this Role</h2>
                <form onSubmit={onSubmitApplication} className="space-y-3">
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full rounded-md border px-3 py-2 text-sm" required />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full rounded-md border px-3 py-2 text-sm" required />
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full rounded-md border px-3 py-2 text-sm" required />
                  <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} placeholder="County (optional)" className="w-full rounded-md border px-3 py-2 text-sm" />
                  <input type="url" value={cvUrl} onChange={(e) => setCvUrl(e.target.value)} placeholder="CV URL (optional)" className="w-full rounded-md border px-3 py-2 text-sm" />
                  <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Cover Letter (optional)" rows={5} className="w-full rounded-md border px-3 py-2 text-sm" />
                  <Button type="submit" variant="hero-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
                {submitMessage && <p className="mt-3 text-sm text-primary">{submitMessage}</p>}
                {submitError && <p className="mt-3 text-sm text-destructive">{submitError}</p>}
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default CareerDetail;
