import AboutCTA from "@/app/components/client/about/AboutCallToAction";
import AboutHero from "@/app/components/client/about/AboutHero";
import AboutStats from "@/app/components/client/about/AboutStats";
import AboutStory from "@/app/components/client/about/AboutStory";
import AboutValues from "@/app/components/client/about/AboutValues";


const AboutPage = () => {
  return (
    <div className="space-y-16 pb-20">
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutValues />
      <AboutCTA />
    </div>
  );
};

export default AboutPage;