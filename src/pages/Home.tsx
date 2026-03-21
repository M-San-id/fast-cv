import {
  ArrowRight,
  Brain,
  Check,
  Download,
  FileText,
  Minus,
  Plus,
  Shield,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import SpotlightCard from "../component/ui/SpolightCard";
import CardSwap, { Card } from "../component/ui/CardSwap";
import FloatingLines from "../component/ui/background/FloatingLines";
import { useState } from "react";
import TextTyping from "../component/ui/TextTyping";

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

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

  const cards = [
    {
      id: "card1",
      title: "Instant",
      desc: "Enter your data and let us handle the design according to your choice in real time",
      icon: <Zap className="w-4 h-4 text-blue-500 dark:text-violet-500" />,
    },
    {
      id: "card2",
      title: "Secure",
      desc: "Your data is safe with us. Design CVs and export PDFs directly from your browser. No data is sent to the server, just on your computer.",
      icon: <Shield className="w-4 h-4 text-blue-500 dark:text-violet-500" />,
    },
    {
      id: "card3",
      title: "AI Reviewer",
      desc: "Get AI-powered suggestions to improve your resume content, optimize keywords, and enhance readability.",
      icon: <Brain className="w-4 h-4 text-blue-500 dark:text-violet-500" />,
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "What is FastCV?",
      answer:
        "FastCV is a web app for creating CVs quickly and easily. Just enter your data and get a ready-to-use CV in real time",
    },
    {
      id: 2,
      question: "Is it free?",
      answer:
        "Yes, it's free! You can create a CV without paying. Simple and to the point.",
    },
    {
      id: 3,
      question: "Do I need to register?",
      answer:
        "No need to register. You can create a CV and get reviews without having to log in. simple and fast",
    },
    {
      id: 4,
      question: "How to use it?",
      answer:
        "very easy. Just choose a suitable template that you like, fill in your personal data and your CV can be shared. Don't forget to get an objective review from AI if you want",
    },
    {
      id: 5,
      question: "Can I download the CV to PDF?",
      answer:
        "Yes, you can download your CV in PDF format, ready to send to HR.",
    },
    {
      id: 6,
      question: "Is my data safe?",
      answer:
        "Very safe. You create a CV directly in the browser. None of the data is sent to our servers or third parties",
    },
    {
      id: 7,
      question: "Do you have template options?",
      answer:
        "Yes, you can choose a template that suits you. We have various templates for you to choose from.",
    },
  ];

  return (
    <>
      {/* hero section */}
      <div className="h-screen bg-neutral-50 dark:bg-zinc-950 transition-colors duration-1000 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
        <div className="max-w-6xl p-5 mx-auto relative z-10 backdrop-blur-sm rounded-lg transition-all duration-1000 ease-out">
          <TextTyping
            words={[
              "Unlimited Efficiency",
              "Industry Standard & ATS Friendly",
              "Free and Fast Access",
              "AI-Powered Review",
            ]}
            pauseTime={2000}
          />
          <p className="text-base md:text-lg my-4 dark:text-neutral-50 transition-all duration-1000 ease-out">
            Combine your CV with artificial intelligence. Create a standout,
            professionally structured, and optimized resume to win the global
            job market.
          </p>
          <div className="transition-all duration-1000 ease-out">
            <Link to="/templates">
              <button className="self-start py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-2 hover:gap-4 transition-all duration-1000 transition-ease-in-out">
                  Just Try It <ArrowRight />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* features section */}
      <div className="h-full bg-neutral-50 dark:bg-zinc-950 transition-all duration-1000 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold dark:text-neutral-50 text-center transition-all duration-1000 FadeInScale">
            Did you know?
          </h2>
          <p className="text-base my-4 dark:text-neutral-50 text-center transition-all duration-1000 FadeInScale">
            <span className="text-red-500 font-bold">Over 75% of resumes </span>
            are rejected by ATS systems before they're even read by a human.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="transition-all duration-1000 ease-out FadeInScale"
              >
                <SpotlightCard
                  className={`custom-spotlight-card dark:text-neutral-50 my-3 h-full`}
                  spotlightColor="rgba(167, 27, 218, 0.4)"
                >
                  <div className="flex my-5 gap-4 items-center">
                    <div className="p-2 bg-blue-200 dark:bg-violet-200 rounded-xl">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold">{card.title}</h3>
                  </div>
                  <p>{card.desc}</p>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* comparison section */}
      <div className="h-full bg-neutral-50 dark:bg-zinc-950 transition-all duration-1000 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold dark:text-neutral-50 text-center transition-all duration-1000 FadeInScale">
            Reasons to choose this platform
          </h2>
          <p className="text-base my-4 dark:text-neutral-50 text-center transition-all duration-1000 FadeInScale">
            A CV isn't just about looks. We optimize every byte of your data to
            get the best and most optimal results.
          </p>
          <div className="flex flex-col gap-2 px-5 my-10 transition-all duration-1000">
            <div className="flex flex-row gap-3 FadeInScale">
              <Check className="text-green-400" />
              <p className="dark:text-neutral-50">ATS Optimized</p>
            </div>
            <div className="flex flex-row gap-3 FadeInScale">
              <Check className="text-green-400" />
              <p className="dark:text-neutral-50">
                Instant download without ads
              </p>
            </div>
            <div className="flex flex-row gap-3 FadeInScale">
              <Check className="text-green-400" />
              <p className="dark:text-neutral-50">AI Reviewer</p>
            </div>
          </div>
          <div className="bg-neutral-100 rounded-2xl p-8 md:p-12 border border-neutral-300 mb-8 dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden relative transition-all duration-1000 FadeInScale">
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
                              width: `${(item.value / item.max) * 100}%`,
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
      </div>
      {/* CTA section */}
      <div className="h-full flex flex-col justify-center gap-7 bg-neutral-50 dark:bg-zinc-900 transition-all duration-1000 py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold dark:text-neutral-50 text-center transition-all duration-1000 FadeInScale">
          Ready to create your CV?
        </h2>
        <p className="text-base my-4 dark:text-neutral-50 text-center transition-all duration-1000 FadeInScale">
          Apply for your dream job with confidence using an AI-reviewed CV with
          FastCV. Try it free now.
        </p>
        <div className="w-full max-w-6xl mx-auto h-[300px] md:h-[600px] relative overflow-hidden bg-neutral-100 dark:bg-zinc-950 rounded-2xl transition-all duration-1000 SlideUp">
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={5}
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />

          <h3 className="text-xl md:text-3xl font-bold dark:text-neutral-50 m-5 md:translate-y-30 z-50 relative FadeInScale">
            100% free. <br />
            <span className="bg-linear-to-r from-blue-600 to-violet-600 dark:from-violet-600 dark:to-blue-600 bg-clip-text text-transparent text-2xl md:text-4xl">
              Do You Think This Is A Dream?
            </span>
          </h3>
          <Link to="/templates">
            <div className="relative translate-x-5 translate-y-30 z-50 FadeInScale">
              <button className=" py-3 px-4 bg-linear-to-r from-blue-600 to-violet-600 dark:from-violet-600 dark:to-blue-600 hover:bg-blue-700 text-white dark:bg-violet-600 dark:hover:bg-violet-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-1000 cursor-pointer">
                <div className="flex items-center gap-3 hover:gap-4 transition-all duration-1000 transition-ease-in-out">
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
      {/* FAQ section */}
      <div className="h-full bg-neutral-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold dark:text-neutral-50 text-center transition-all duration-1000 FadeInScale">
            Frequently Asked Questions
          </h2>
          <p className="text-base my-4 dark:text-neutral-50 text-center transition-all duration-1000 FadeInScale">
            Here are some common questions about our CV builder.
          </p>
          {faqs.map((faq) => (
            <div key={faq.id} className="transition-all duration-1000">
              <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group FadeInScale"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openFaq === faq.id}
              >
                <span
                  className={`text-lg font-medium transition-colors duration-1000 text-zinc-950 dark:text-neutral-50 ${openFaq === faq.id ? "text-blue-600 dark:text-violet-600" : "text-gray-800 group-hover:text-blue-600 dark:group-hover:text-violet-600"}`}
                >
                  {faq.question}
                </span>
                <div
                  className={`transform transition-all duration-1000 ${openFaq === faq.id ? "rotate-180" : "rotate-0"}`}
                >
                  {openFaq === faq.id ? (
                    <Minus className="w-5 h-5 text-blue-600 dark:text-violet-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-violet-600" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFaq === faq.id
                    ? "max-h-96 opacity-100 mb-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 dark:text-neutral-50 leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
