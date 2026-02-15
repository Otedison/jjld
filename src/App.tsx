import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Founders from "./pages/Founders";
import FounderProfile from "./pages/FounderProfile";
import Team from "./pages/Team";
import Programmes from "./pages/Programmes";
import ServiceCharter from "./pages/ServiceCharter";
import Resources from "./pages/Resources";
import GetInvolved from "./pages/GetInvolved";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import EventDetail from "./pages/EventDetail";
import EventRegister from "./pages/EventRegister";
import Gallery from "./pages/Gallery";
import Video from "./pages/Video";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import Consultancy from "./pages/Consultancy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/mandate" element={<About />} />
            <Route path="/about/founders" element={<Founders />} />
            <Route path="/about/founders/:slug" element={<FounderProfile />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/programmes/:slug" element={<Programmes />} />
            <Route path="/consultancy" element={<Consultancy />} />
            <Route path="/service-charter" element={<ServiceCharter />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<CareerDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/events/:slug/register" element={<EventRegister />} />
            <Route path="/media/video" element={<Video />} />
            <Route path="/media/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
