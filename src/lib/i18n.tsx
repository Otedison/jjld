import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type LanguageCode = "en" | "sw" | "fr" | "de";

type Dictionary = Record<string, string | Dictionary>;

type I18nContextType = {
  language: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
};

const translations: Record<LanguageCode, Dictionary> = {
  en: {
    lang: { en: "English", sw: "Kiswahili", fr: "French", de: "German" },
    nav: {
      home: "Home",
      whoWeAre: "Who We Are",
      mandate: "Our Mandate",
      founders: "Founders",
      visionMissionValues: "Vision, Mission & Values",
      board: "Board of Directors",
      team: "Our Team",
      partnersNetworks: "Partners & Networks",
      programmes: "Our Programmes",
      consultancy: "Consultancy",
      civicEducation: "Comprehensive Civic Education",
      publicFinance: "Public Finance & Budget Literacy",
      elections: "Elections & Political Participation",
      policy: "Public Policy & Legislative Engagement",
      sectorGovernance: "Sector-Specific Governance",
      leadership: "Leadership Development",
      resources: "Resources",
      guidesToolkits: "Citizen Guides & Toolkits",
      budgetDocs: "Budget Documents",
      policyBriefs: "Policy Briefs",
      annualReports: "Annual Reports",
      serviceCharter: "Service Charter",
      videosPodcasts: "Videos & Podcasts",
      getInvolved: "Get Involved",
      volunteer: "Volunteer",
      partner: "Partner with Us",
      internships: "Internships",
      careers: "Careers",
      leadershipAcademy: "Leadership Academy",
      media: "Media#",
      news: "News & Updates",
      ourGallery: "Our Gallery",
      contact: "Contact",
      toggleMenu: "Toggle menu",
    },
    footer: {
      tagline: "Empowering Citizens, Strengthening Democracy, Transforming Kenya.",
      quickLinks: "Quick Links",
      contactUs: "Contact Us",
      stayUpdated: "Stay Updated",
      subscribeText: "Subscribe to receive civic education updates and event notifications.",
      yourEmail: "Your email",
      subscribe: "Subscribe",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      tollFree: "Toll-Free",
      whatsapp: "WhatsApp",
    },
    ui: {
      noPostsYet: "No posts yet.",
      noResourcesYet: "No resources yet.",
      noJobsYet: "No jobs yet.",
      noEventsYet: "No events yet.",
      subscribeToAccess: "Subscribe to Access Resources",
      resourceLibraryDesc: "Our resource library contains valuable civic education materials, guides, and policy documents. Subscribe for free to access all downloadable resources.",
      subscribeForFree: "Subscribe for Free",
      subscribing: "Subscribing...",
      subscriptionSuccess: "Subscription successful! You can now access all resources.",
      enterValidEmail: "Please enter a valid email address.",
      subscriptionFailed: "Failed to subscribe. Please try again.",
    },
    resources: {
      accessLibrary: "Access our comprehensive library of civic education resources.",
    },
  },
  sw: {
    lang: { en: "Kiingereza", sw: "Kiswahili", fr: "Kifaransa", de: "Kijerumani" },
    nav: {
      home: "Nyumbani",
      whoWeAre: "Sisi Ni Nani",
      mandate: "Wajibu Wetu",
      founders: "Waanzilishi",
      visionMissionValues: "Dira, Dhamira na Maadili",
      board: "Bodi ya Wakurugenzi",
      team: "Timu Yetu",
      partnersNetworks: "Washirika na Mitandao",
      programmes: "Programu Zetu",
      consultancy: "Ushauri",
      civicEducation: "Elimu Kamili ya Uraia",
      publicFinance: "Fedha za Umma na Uelewa wa Bajeti",
      elections: "Uchaguzi na Ushiriki wa Kisiasa",
      policy: "Sera za Umma na Ushiriki wa Bunge",
      sectorGovernance: "Utawala wa Kisekta",
      leadership: "Maendeleo ya Uongozi",
      resources: "Rasilimali",
      guidesToolkits: "Miongozo na Vifaa",
      budgetDocs: "Nyaraka za Bajeti",
      policyBriefs: "Muhtasari wa Sera",
      annualReports: "Ripoti za Mwaka",
      serviceCharter: "Mkataba wa Huduma",
      videosPodcasts: "Video na Podikasti",
      getInvolved: "Shiriki",
      volunteer: "Jitolee",
      partner: "Shirikiana Nasi",
      internships: "Mafunzo",
      careers: "Ajira",
      leadershipAcademy: "Akademia ya Uongozi",
      media: "Media#",
      news: "Habari na Taarifa",
      ourGallery: "Maktaba ya Picha",
      contact: "Wasiliana",
      toggleMenu: "Badili menyu",
    },
    footer: {
      tagline: "Kuwawezesha Wananchi, Kuimarisha Demokrasia, Kubadilisha Kenya.",
      quickLinks: "Viungo vya Haraka",
      contactUs: "Wasiliana Nasi",
      stayUpdated: "Pata Taarifa",
      subscribeText: "Jiandikishe upokee taarifa za elimu ya uraia na matukio.",
      yourEmail: "Barua pepe yako",
      subscribe: "Jiandikishe",
      rights: "Haki zote zimehifadhiwa.",
      privacy: "Sera ya Faragha",
      terms: "Masharti ya Matumizi",
      tollFree: "Bure",
      whatsapp: "WhatsApp",
    },
    ui: {
      noPostsYet: "Bado hakuna machapisho.",
      noResourcesYet: "Bado hakuna rasilimali.",
      noJobsYet: "Bado hakuna ajira.",
      noEventsYet: "Bado hakuna matukio.",
      subscribeToAccess: "Jiandikishe ili Kupata Rasilimali",
      resourceLibraryDesc: "Maktaba yetu ya rasilimali ina nyenzo za elimu ya uraia, viongozi, na hati za sera. Jiandikishe bila malipo ili kupata rasilimali zote za kushusha.",
      subscribeForFree: "Jiandikishe Bure",
      subscribing: "Inajiandikisha...",
      subscriptionSuccess: "Umejiandikisha! Sasa unaweza kupata rasilimali zote.",
      enterValidEmail: "Tafadhali ingiza anwani ya barua pepe sahihi.",
      subscriptionFailed: "Imeshindwa kujiandikisha. Tafadhali jaribu tena.",
    },
    resources: {
      accessLibrary: "Pata uf accessi kwenye maktaba yetu kamili ya rasilimali za elimu ya uraia.",
    },
  },
  fr: {
    lang: { en: "Anglais", sw: "Swahili", fr: "Français", de: "Allemand" },
    nav: {
      home: "Accueil",
      whoWeAre: "Qui Sommes-Nous",
      mandate: "Notre Mandat",
      founders: "Fondateurs",
      visionMissionValues: "Vision, Mission et Valeurs",
      board: "Conseil d'Administration",
      team: "Notre Équipe",
      partnersNetworks: "Partenaires et Réseaux",
      programmes: "Nos Programmes",
      consultancy: "Conseil",
      civicEducation: "Éducation Civique Complète",
      publicFinance: "Finances Publiques et Budget",
      elections: "Élections et Participation Politique",
      policy: "Politiques Publiques et Législation",
      sectorGovernance: "Gouvernance Sectorielle",
      leadership: "Développement du Leadership",
      resources: "Ressources",
      guidesToolkits: "Guides et Outils",
      budgetDocs: "Documents Budgétaires",
      policyBriefs: "Notes de Politique",
      annualReports: "Rapports Annuels",
      serviceCharter: "Charte de Service",
      videosPodcasts: "Vidéos et Podcasts",
      getInvolved: "S'impliquer",
      volunteer: "Bénévolat",
      partner: "Devenir Partenaire",
      internships: "Stages",
      careers: "Carrières",
      leadershipAcademy: "Académie du Leadership",
      media: "Média#",
      news: "Actualités",
      ourGallery: "Notre Galerie",
      contact: "Contact",
      toggleMenu: "Basculer le menu",
    },
    footer: {
      tagline: "Donner du pouvoir aux citoyens, renforcer la démocratie, transformer le Kenya.",
      quickLinks: "Liens Rapides",
      contactUs: "Contactez-Nous",
      stayUpdated: "Restez Informé",
      subscribeText: "Abonnez-vous pour recevoir les actualités civiques et les événements.",
      yourEmail: "Votre e-mail",
      subscribe: "S'abonner",
      rights: "Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      tollFree: "Sans frais",
      whatsapp: "WhatsApp",
    },
    ui: {
      noPostsYet: "Aucune publication pour le moment.",
      noResourcesYet: "Aucune ressource pour le moment.",
      noJobsYet: "Aucun emploi pour le moment.",
      noEventsYet: "Aucun événement pour le moment.",
      subscribeToAccess: "Abonnez-vous pour accéder aux ressources",
      resourceLibraryDesc: "Notre bibliothèque de ressources contient des documents précieux d'éducation civique, des guides et des documents de politique. Abonnez-vous gratuitement pour accéder à toutes les ressources téléchargeables.",
      subscribeForFree: "S'abonner gratuitement",
      subscribing: "Inscription en cours...",
      subscriptionSuccess: "Inscription réussie ! Vous pouvez maintenant accéder à toutes les ressources.",
      enterValidEmail: "Veuillez entrer une adresse e-mail valide.",
      subscriptionFailed: "Échec de l'abonnement. Veuillez réessayer.",
    },
    resources: {
      accessLibrary: "Accédez à notre bibliothèque complète de ressources d'éducation civique.",
    },
  },
  de: {
    lang: { en: "Englisch", sw: "Suaheli", fr: "Französisch", de: "Deutsch" },
    nav: {
      home: "Startseite",
      whoWeAre: "Wer Wir Sind",
      mandate: "Unser Auftrag",
      founders: "Gründer",
      visionMissionValues: "Vision, Mission und Werte",
      board: "Vorstand",
      team: "Unser Team",
      partnersNetworks: "Partner und Netzwerke",
      programmes: "Unsere Programme",
      consultancy: "Beratung",
      civicEducation: "Umfassende Bürgerbildung",
      publicFinance: "Öffentliche Finanzen und Budgetwissen",
      elections: "Wahlen und politische Beteiligung",
      policy: "Öffentliche Politik und Gesetzgebung",
      sectorGovernance: "Sektorale Governance",
      leadership: "Führungsentwicklung",
      resources: "Ressourcen",
      guidesToolkits: "Leitfäden und Toolkits",
      budgetDocs: "Budgetdokumente",
      policyBriefs: "Policy Briefs",
      annualReports: "Jahresberichte",
      serviceCharter: "Dienstleistungs-Charta",
      videosPodcasts: "Videos und Podcasts",
      getInvolved: "Mitmachen",
      volunteer: "Freiwilligenarbeit",
      partner: "Partner werden",
      internships: "Praktika",
      careers: "Karriere",
      leadershipAcademy: "Leadership Academy",
      media: "Medien#",
      news: "Neuigkeiten",
      ourGallery: "Unsere Galerie",
      contact: "Kontakt",
      toggleMenu: "Menü umschalten",
    },
    footer: {
      tagline: "Bürger stärken, Demokratie stärken, Kenia transformieren.",
      quickLinks: "Schnellzugriffe",
      contactUs: "Kontakt",
      stayUpdated: "Aktuell Bleiben",
      subscribeText: "Abonnieren Sie Updates zu Bürgerbildung und Veranstaltungen.",
      yourEmail: "Ihre E-Mail",
      subscribe: "Abonnieren",
      rights: "Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
      tollFree: "Gebührenfrei",
      whatsapp: "WhatsApp",
    },
    ui: {
      noPostsYet: "Noch keine Beiträge.",
      noResourcesYet: "Noch keine Ressourcen.",
      noJobsYet: "Noch keine Jobs.",
      noEventsYet: "Noch keine Veranstaltungen.",
      subscribeToAccess: "Abonnieren Sie, um auf Ressourcen zuzugreifen",
      resourceLibraryDesc: "Unsere Ressourcenbibliothek enthält wertvolle Materialien zur Bürgerbildung, Leitfäden und Politkdokumente. Abonnieren Sie kostenlos, um alle herunterladbaren Ressourcen zu erhalten.",
      subscribeForFree: "Kostenlos abonnieren",
      subscribing: "Anmeldung läuft...",
      subscriptionSuccess: "Abonnement erfolgreich! Sie können jetzt auf alle Ressourcen zugreifen.",
      enterValidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      subscriptionFailed: "Abonnement fehlgeschlagen. Bitte versuchen Sie es erneut.",
    },
    resources: {
      accessLibrary: "Greifen Sie auf unsere umfassende Bibliothek mit Ressourcen zur Bürgerbildung zu.",
    },
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(dictionary: Dictionary, key: string): string | undefined {
  const parts = key.split(".");
  let current: string | Dictionary | undefined = dictionary;

  for (const part of parts) {
    if (!current || typeof current === "string") return undefined;
    current = current[part];
  }

  return typeof current === "string" ? current : undefined;
}

function detectInitialLanguage(): LanguageCode {
  const saved = localStorage.getItem("app_language");
  if (saved === "en" || saved === "sw" || saved === "fr" || saved === "de") {
    return saved;
  }

  const browser = navigator.language.toLowerCase();
  if (browser.startsWith("sw")) return "sw";
  if (browser.startsWith("fr")) return "fr";
  if (browser.startsWith("de")) return "de";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(detectInitialLanguage());

  useEffect(() => {
    localStorage.setItem("app_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextType>(() => {
    const t = (key: string) => {
      const localized = getNestedValue(translations[language], key);
      if (localized) return localized;
      return getNestedValue(translations.en, key) || key;
    };

    return {
      language,
      changeLanguage: setLanguage,
      t,
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
