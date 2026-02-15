import { Mail, Phone, MessageCircle, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { useI18n, type LanguageCode } from "@/lib/i18n";
import { useEffect } from "react";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/JukwaaDemokrasia", label: "X (Twitter)" },
  { icon: Facebook, href: "https://facebook.com/JukwaaLaDemokrasiaKenya", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/jukwaademokrasia", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/c/JukwaaLaDemokrasia", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/jukwaa-la-demokrasia", label: "LinkedIn" },
];

const languages: Array<{ code: LanguageCode; label: string }> = [
  { code: "en", label: "EN" },
  { code: "sw", label: "SW" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
];

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, string | boolean>,
          elementId: string
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

function applyGoogleLanguage(languageCode: string) {
  const value = `/auto/${languageCode}`;
  document.cookie = `googtrans=${value};path=/`;
  if (window.location.hostname.includes(".")) {
    document.cookie = `googtrans=${value};path=/;domain=.${window.location.hostname}`;
  }
  window.location.reload();
}

const TopBar = () => {
  const { language, changeLanguage, t } = useI18n();

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,sw,fr,de",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const scriptId = "google-translate-script";
    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-emerald-800 to-green-700 text-primary-foreground text-sm py-2 no-print">
      <div className="site-container flex items-center justify-between">
        <div className="hidden md:flex items-center gap-6">
          <a href="mailto:info@jukwaalademokrasia.org" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <Mail className="h-3.5 w-3.5" />
            <span>info@jukwaalademokrasia.org</span>
          </a>
          <a href="tel:+254710730032" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <Phone className="h-3.5 w-3.5" />
            <span>+254 710 730032</span>
          </a>
          <a href="https://wa.me/254743653115" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>0743653115</span>
          </a>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="hover:text-secondary transition-colors"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-1 border-l border-primary-foreground/20 pl-4 ml-1">
            {languages.map((lang, index) => (
              <div key={lang.code} className="flex items-center gap-1">
                <button
                  type="button"
                  title={t(`lang.${lang.code}`)}
                  onClick={() => {
                    changeLanguage(lang.code);
                    applyGoogleLanguage(lang.code);
                  }}
                  className={`text-xs transition-colors ${
                    language === lang.code ? "font-semibold text-primary-foreground" : "text-primary-foreground/60 hover:text-primary-foreground"
                  }`}
                >
                  {lang.label}
                </button>
                {index < languages.length - 1 && <span className="text-primary-foreground/40">|</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="google_translate_element" className="hidden" />
    </div>
  );
};

export default TopBar;
