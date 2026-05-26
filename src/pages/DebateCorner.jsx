import React from "react";
import PageShell, { PageHero } from "../components/PageShell";

const PRO_ARGUMENTS = [
  {
    initials: "AM",
    name: "Prof. Aris M.",
    role: "Dialectics Specialist",
    text: "\"The contradiction between productive forces and relations of production remains the engine of history, even in the digital age.\"",
    likes: 24,
    action: "View Thesis",
  },
  {
    initials: "LN",
    name: "Le Nguyen",
    role: "Advanced Student",
    text: "Materialism doesn't ignore the digital; it identifies the hardware and server farms as the new means of production.",
    likes: 12,
    action: "Reply",
  },
];

const COUNTER_ARGUMENTS = [
  {
    initials: "SK",
    name: "Dr. S. K. Klein",
    role: "Phenomenologist",
    text: "Does historical materialism account for the subjective 'experience' of the worker in a purely algorithmic labor market?",
    likes: 38,
    action: "Challenge",
  },
  {
    initials: "TH",
    name: "Tran Hoai",
    role: "Philosophy Minor",
    text: "Is consciousness truly secondary if the 'metaverse' exists purely in the realm of perceived reality?",
    likes: 5,
    action: "Reply",
  },
];

function ArgumentCard({ argument, variant }) {
  // variant: "pro" (do) hoac "counter" (xanh duong)
  const borderColor = variant === "pro" ? "border-l-red-800" : "border-l-blue-800";
  const accentColor = variant === "pro" ? "text-red-800" : "text-blue-800";
  const avatarBg = variant === "pro" ? "bg-red-800" : "bg-blue-800";

  return (
    <article
      className={`bg-white rounded-xl shadow-md border border-gray-200 border-l-4 ${borderColor} p-5`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`h-10 w-10 rounded-full ${avatarBg} text-white flex items-center justify-center font-bold text-sm shrink-0`}
        >
          {argument.initials}
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{argument.name}</h4>
          <p className="text-xs text-gray-500">{argument.role}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">{argument.text}</p>
      <div className="flex items-center justify-between text-sm">
        <span className={`flex items-center gap-1 ${accentColor} font-semibold`}>
          <span className="material-symbols-outlined text-base">thumb_up</span>
          {argument.likes}
        </span>
        <button
          type="button"
          className={`${accentColor} font-semibold hover:underline`}
        >
          {argument.action}
        </button>
      </div>
    </article>
  );
}

const DebateCorner = () => {
  return (
    <PageShell activeKey="debate">
      <PageHero
        eyebrow="Active Debate"
        icon="diversity_3"
        title={
          <>
            The Primacy of Matter over Consciousness
            <span className="block text-3xl md:text-4xl mt-2 opacity-90">
              Historical Materialism in the 21st Century
            </span>
          </>
        }
      >
        <div className="flex items-center gap-4 mt-2">
          <p className="text-white/80 text-sm">
            <strong className="text-white">142 Active</strong> participants
          </p>
          <div className="flex -space-x-2">
            <div className="h-8 w-8 rounded-full bg-red-900 border-2 border-red-800 flex items-center justify-center text-xs font-bold">
              AM
            </div>
            <div className="h-8 w-8 rounded-full bg-red-900 border-2 border-red-800 flex items-center justify-center text-xs font-bold">
              LN
            </div>
            <div className="h-8 w-8 rounded-full bg-white text-red-800 border-2 border-red-800 flex items-center justify-center text-xs font-bold">
              +139
            </div>
          </div>
        </div>
      </PageHero>

      <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
        {/* Debate columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pro column */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
              <span className="material-symbols-outlined text-red-800">
                balance
              </span>
              <h3 className="font-bold text-lg text-gray-900">Pro-Dialectic</h3>
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {PRO_ARGUMENTS.map((arg, index) => (
                <ArgumentCard key={index} argument={arg} variant="pro" />
              ))}
            </div>
          </div>

          {/* Counter column */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
              <span className="material-symbols-outlined text-blue-800">
                gavel
              </span>
              <h3 className="font-bold text-lg text-gray-900">
                Counter-Arguments
              </h3>
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {COUNTER_ARGUMENTS.map((arg, index) => (
                <ArgumentCard key={index} argument={arg} variant="counter" />
              ))}
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0">
            U
          </div>
          <input
            type="text"
            placeholder="Tham gia tranh biện với lập luận của bạn..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:border-red-800 focus:ring-1 focus:ring-red-800 outline-none"
          />
          <button
            type="button"
            className="border-2 border-red-800 text-red-800 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition-colors hidden md:block"
          >
            Attach Cite
          </button>
          <button
            type="button"
            className="bg-red-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-900 transition-colors"
          >
            Send Argument
          </button>
        </div>

        {/* AI panel */}
        <div className="bg-blue-50 p-8 rounded-xl shadow-md border-l-4 border-red-800">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-red-800">
              psychology
            </span>
            <h3 className="font-bold text-lg text-gray-900">
              Dialectic AI Analysis
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">
                Live Summary
              </h4>
              <p className="text-gray-700">
                The debate is currently centered on the definition of "base"
                and "superstructure" in the context of digital automation.
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">
                Suggested Context
              </h4>
              <p className="text-gray-700 italic">
                "It is not the consciousness of men that determines their
                existence, but their social existence that determines their
                consciousness." — Karl Marx
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-200">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3">
              Logical Fallacy Alerts
            </h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Strawman detected in Counter-Argument #4</li>
              <li>• Strong syllogism in Pro-Dialectic #2</li>
            </ul>
          </div>

          <button
            type="button"
            className="mt-6 bg-red-800 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-red-900 transition-colors"
          >
            Generate Debate Report
          </button>
        </div>
      </div>
    </PageShell>
  );
};

export default DebateCorner;
