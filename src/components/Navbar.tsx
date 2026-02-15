import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useI18n();

  const navItems: NavItem[] = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.whoWeAre"),
      href: "/about",
      children: [
        { label: t("nav.mandate"), href: "/about/mandate" },
        { label: t("nav.founders"), href: "/about/founders" },
        { label: t("nav.visionMissionValues"), href: "/about" },
        { label: t("nav.board"), href: "/about#board" },
        { label: t("nav.team"), href: "/about/team" },
        { label: t("nav.partnersNetworks"), href: "/about#partners" },
      ],
    },
    {
      label: t("nav.programmes"),
      href: "/programmes",
      children: [
        { label: t("nav.civicEducation"), href: "/programmes/civic-education" },
        { label: t("nav.publicFinance"), href: "/programmes/public-finance" },
        { label: t("nav.elections"), href: "/programmes/elections" },
        { label: t("nav.policy"), href: "/programmes/policy" },
        { label: t("nav.sectorGovernance"), href: "/programmes/sector-governance" },
        { label: t("nav.leadership"), href: "/programmes/leadership" },
      ],
    },
    { label: t("nav.consultancy"), href: "/consultancy" },
    {
      label: t("nav.resources"),
      href: "/resources",
      children: [
        { label: t("nav.guidesToolkits"), href: "/resources#guides" },
        { label: t("nav.budgetDocs"), href: "/resources#budget" },
        { label: t("nav.policyBriefs"), href: "/resources#policy" },
        { label: t("nav.annualReports"), href: "/resources#reports" },
        { label: t("nav.serviceCharter"), href: "/service-charter" },
        { label: t("nav.videosPodcasts"), href: "/resources#media" },
      ],
    },
    {
      label: t("nav.getInvolved"),
      href: "/get-involved",
      children: [
        { label: t("nav.volunteer"), href: "/get-involved#volunteer" },
        { label: t("nav.partner"), href: "/get-involved#partner" },
        { label: t("nav.internships"), href: "/get-involved#internships" },
        { label: t("nav.careers"), href: "/careers" },
        { label: t("nav.leadershipAcademy"), href: "/get-involved#academy" },
      ],
    },
    {
      label: t("nav.media"),
      href: "/news",
      children: [
        { label: t("nav.news"), href: "/news" },
        { label: "Video", href: "/media/video" },
        { label: t("nav.ourGallery"), href: "/media/gallery" },
      ],
    },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <nav className="bg-background shadow-nav sticky top-0 z-50 no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center">
            <img 
              src="/jukwaaa.png" 
              alt="Jukwaa La Demokrasia Logo"
              className="h-16 w-auto"
              onError={(e) => {
                // Fallback to original logo if image fails to load
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-14 h-14 rounded-full bg-kenya-black flex items-center justify-center" style={{ display: 'none' }}>
              <div className="w-10 h-10 rounded-full border-2 border-primary-foreground flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5 px-4 xl:px-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-2 xl:px-2.5 py-2 text-[0.74rem] xl:text-xs font-semibold font-nav tracking-[0.01em] transition-colors rounded-md whitespace-nowrap
                    ${isActive(item.href) ? "text-primary" : "text-foreground hover:text-primary"}`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />}
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-background border rounded-lg shadow-card-hover py-2 min-w-[240px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <Button asChild variant="hero-primary" size="sm">
              <Link to="/get-involved#partner">Donate</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("nav.toggleMenu")}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t max-h-[80vh] overflow-y-auto animate-fade-in">
          <div className="w-full px-4 sm:px-6 py-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-border last:border-0">
                {item.children ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full py-3 text-sm font-nav font-semibold tracking-[0.02em] text-foreground"
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="pb-3 pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block py-3 text-sm font-nav font-semibold tracking-[0.02em] text-foreground hover:text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Button asChild variant="hero-primary" className="w-full">
                <Link to="/get-involved#partner" onClick={() => setMobileOpen(false)}>
                  Donate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
