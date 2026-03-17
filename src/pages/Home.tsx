import {
  ArrowRight,
  Brain,
  Check,
  Download,
  FileText,
  Shield,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import SpotlightCard from "../component/ui/SpolightCard";
import { useEffect, useState } from "react";
import CardSwap, { Card } from "../component/ui/CardSwap";
import FloatingLines from "../component/ui/background/FloatingLines";

function Home() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    {
      id: "speed",
      title: "Preparation Time (lower is better)",
      sub: "/Seconds",
      icon: <Download className="w-4 h-4 text-blue-500 dark:text-violet-500" />,
      items: [
        {
          name: "FastCV",
          value: 0.2,
          display: "0.2s",
          max: 3,
          color: "bg-blue-600 dark:bg-violet-600",
          active: true,
        },
        {
          name: "Other platform",
          value: 2.4,
          display: "2.4s",
          max: 3,
          color: "bg-slate-400 dark:bg-neutral-500",
          active: false,
        },
      ],
    },
    {
      id: "size",
      title: "PDF File Size (Without Photo)",
      sub: "KB",
      icon: <FileText className="w-4 h-4 text-blue-500 dark:text-violet-500" />,
      items: [
        {
          name: "FastCV",
          value: 256,
          display: "256KB",
          max: 3072,
          color: "bg-blue-600 dark:bg-violet-600",
          active: true,
        },
        {
          name: "Other platform",
          value: 2048,
          display: ">2MB",
          max: 3072,
          color: "bg-slate-400 dark:bg-neutral-500",
          active: false,
        },
      ],
    },
  ];

  return (
    <>
      {/* hero section */}
      <div className="h-screen bg-neutral-50 dark:bg-zinc-950 transition-colors duration-300 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
        <div className="max-w-6xl p-5 mx-auto relative z-10 backdrop-blur-sm">
          <h1 className="text-3xl font-bold dark:text-neutral-50">
            Create a Professional <br />
            <span className="text-violet-600 ">CV in Minutes</span>
          </h1>
          <p className="text-base my-4 dark:text-neutral-50">
            Combine your CV with artificial intelligence. Create a standout,
            professionally structured, and optimized resume to win the global
            job market.
          </p>
          <Link to="/templates">
            <button className="self-start py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-2 hover:gap-4 transition-all duration-300 transition-ease-in-out">
                Just Try It <ArrowRight />
              </div>
            </button>
          </Link>
        </div>
      </div>
      {/* features section */}
      <div className="h-full bg-neutral-50 dark:bg-zinc-950 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold dark:text-neutral-50 text-center">
            Did you know?
          </h2>
          <p className="text-base my-4 dark:text-neutral-50 text-center">
            <span className="text-red-500 font-bold">Over 75% of resumes</span>
            are rejected by ATS systems before they're even read by a human.
          </p>
          <SpotlightCard
            className="custom-spotlight-card dark:text-neutral-50 my-6"
            spotlightColor="rgba(167, 27, 218, 0.4)"
          >
            <div className="flex my-5 gap-4 items-center">
              <div className="p-2 bg-blue-200 dark:bg-violet-200 rounded-xl">
                <Zap
                  className="text-blue-500 dark:text-violet-500 "
                  size={24}
                />
              </div>
              <h3 className="text-xl font-bold">Instant</h3>
            </div>
            <p>
              Enter your data and let us handle the design according to your
              choice in real time
            </p>
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card dark:text-neutral-50 my-6"
            spotlightColor="rgba(167, 27, 218, 0.4)"
          >
            <div className="flex my-5 gap-4 items-center">
              <div className="p-2 bg-blue-200 dark:bg-violet-200 rounded-xl">
                <Shield
                  className="text-blue-500 dark:text-violet-500 "
                  size={24}
                />
              </div>
              <h3 className="text-xl font-bold">Secure</h3>
            </div>
            <p>
              Your data is safe with us. Design CVs and export PDFs directly
              from your browser. No data is sent to the server, just on your
              computer.
            </p>
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card dark:text-neutral-50 my-6"
            spotlightColor="rgba(167, 27, 218, 0.4)"
          >
            <div className="flex my-5 gap-4 items-center">
              <div className="p-2 bg-blue-200 dark:bg-violet-200 rounded-xl">
                <Brain
                  className="text-blue-500 dark:text-violet-500 "
                  size={24}
                />
              </div>
              <h3 className="text-xl font-bold">AI Reviewer</h3>
            </div>
            <p>
              Get AI-powered suggestions to improve your resume content,
              optimize keywords, and enhance readability.
            </p>
          </SpotlightCard>
        </div>
      </div>
      {/* comparison section */}
      <div className="h-full bg-neutral-50 dark:bg-zinc-950 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold dark:text-neutral-50 text-center">
          Reasons to choose this platform
        </h2>
        <p className="text-base my-4 dark:text-neutral-50 text-center">
          A CV isn't just about looks. We optimize every byte of your data to
          get the best and most optimal results.
        </p>
        <div className="flex flex-col gap-2 px-5 my-10">
          <div className="flex flex-row gap-3">
            <Check className="text-green-400" />
            <p className="dark:text-neutral-50">ATS Optimized</p>
          </div>
          <div className="flex flex-row gap-3">
            <Check className="text-green-400" />
            <p className="dark:text-neutral-50">Instant download without ads</p>
          </div>
          <div className="flex flex-row gap-3">
            <Check className="text-green-400" />
            <p className="dark:text-neutral-50">AI Reviewer</p>
          </div>
        </div>
        <div className="bg-neutral-100 rounded-2xl p-8 md:p-12 border border-neutral-300 mb-8 dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden relative transition-colors duration-300">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
            {metrics.map((metric) => (
              <div key={metric.id} className="space-y-8">
                <div className="flex justify-between items-end border-b border-neutral-100 pb-4 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 dark:bg-violet-200 p-2 rounded-xl">
                      {metric.icon}
                    </div>
                    <h3 className="text-sm font-black text-neutral-800 uppercase tracking-tight dark:text-neutral-50">
                      {metric.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                    {metric.sub}
                  </span>
                </div>

                <div className="space-y-6">
                  {metric.items.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-center mb-2.5 px-1">
                        <span
                          className={`text-xs font-bold transition-colors ${item.active ? "text-blue-600 dark:text-violet-600" : "text-neutral-600 dark:text-neutral-50"}`}
                        >
                          {item.name}
                        </span>
                        <span
                          className={`text-xs font-mono font-black ${item.active ? "text-blue-600 dark:text-violet-600" : "text-neutral-600 dark:text-neutral-50"}`}
                        >
                          {item.display || `${item.value}s`}
                        </span>
                      </div>
                      <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-700 rounded-full p-1 overflow-hidden shadow-inner">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${item.color} ${item.active ? "shadow-[0_0_15px_rgba(37,99,235,0.4)]" : ""}`}
                          style={{
                            width: animate
                              ? `${(item.value / item.max) * 100}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CTA section */}
      <div className="h-150 flex flex-col justify-center gap-7 bg-neutral-50 dark:bg-zinc-900 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold dark:text-neutral-50 text-center">
          Ready to create your CV?
        </h2>
        <p className="text-base my-4 dark:text-neutral-50 text-center">
          Apply for your dream job with confidence using an AI-reviewed CV with
          FastCV. Try it free now.
        </p>
        <div className="w-full max-w-6xl mx-auto h-[700px] relative overflow-hidden bg-neutral-100 dark:bg-zinc-950 rounded-2xl border border-neutral-300 dark:border-zinc-800">
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={5}
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />

          <h3 className="text-xl font-bold dark:text-neutral-50 m-5 z-50 relative">
            100% free. <br />
            <span className="bg-linear-to-r from-blue-600 to-violet-600 dark:from-violet-600 dark:to-blue-600 bg-clip-text text-transparent text-2xl">
              Don't believe it?
            </span>
          </h3>
          <Link to="/templates">
            <div className="relative translate-x-5 translate-y-20 z-50">
              <button className=" py-3 px-4 bg-linear-to-r from-blue-600 to-violet-600 dark:from-violet-600 dark:to-blue-600 hover:bg-blue-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3 hover:gap-4 transition-all duration-300 transition-ease-in-out">
                  Just Try It <ArrowRight />
                </div>
              </button>
            </div>
          </Link>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            <Card>
              <h3>Card 1</h3>
              <p>Your content here</p>
            </Card>
            <Card>
              <h3>Card 2</h3>
              <p>Your content here</p>
            </Card>
            <Card>
              <h3>Card 3</h3>
              <p>Your content here</p>
            </Card>
          </CardSwap>
        </div>
      </div>
    </>
  );
}

export default Home;
