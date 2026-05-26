import React from "react";
import PageShell, { PageHero } from "../components/PageShell";

const LETTERS = ["E", "C", "T", "I", "X", "S", "L", "M", "A", "K", "O", "N"];
const ANSWER_SLOTS = ["D", "I", "A", "L", "_", "", "", "", "", ""];

const IMAGE_HINTS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAeOoBokITD8Ps9qRbb4nBKxbHYUeGk46aBDXiSJR_a6kxXPO4_fcgueNFpWIcXa2u3mY5XCKBhmWiUAnzp-kAUCFf9JU3nhg5Rc_RyY8jWs6ZmvH7E8Nm_nj8VI3Jo6MSLnIw-Cx02Q0nX94f-p1QWV8LSV_DSYg9KlP21tQojXVTJWDyKxeM9jnajsHpwtPqvbxb7XgQwrTt7dNtcZL0RjJO5Nfo46_zg8pKNwY6W1fAuRtxP8GaTBGjqgNah4FLHbb-nFfGoRkA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAMP3hes-h3qvtht_rem5TDP6b_UadJrUK6_qXGwuVIvpZJT0doGhy7-YJSbOkWxljcHBXYBydnw97955UUkbCkERhJEKinrS7itD6nSOouqekFP3w05QIkm0gROjkQ2RBfuhv-rkTci6cZv7akFwUoJxFQ7Lc2_7BTdZZRQtzYIZYdeKpWhq6KQtCE4U_VsSZjUhKa5HMtS1qphPTARWhXrYEUPwDWnm7KvMFSDRnyY88WbrleVtCTdg6EAUZH1Z3QLMB1tRIi4gU",
];

const ImageQuiz = () => {
  return (
    <PageShell activeKey="quiz">
      <PageHero
        eyebrow="Chuyên đề 06"
        icon="image_search"
        title="Đuổi hình bắt triết học"
        subtitle="Giải mã các khái niệm trừu tượng của tư tưởng Mác – Lênin qua hình ảnh biểu tượng."
      >
        <div className="flex gap-6 mt-2">
          <div>
            <span className="text-xs uppercase text-white/70 tracking-wider">
              Level
            </span>
            <h3 className="text-2xl font-bold">Advanced</h3>
          </div>
          <div className="border-l border-white/20" />
          <div>
            <span className="text-xs uppercase text-white/70 tracking-wider">
              Score
            </span>
            <h3 className="text-2xl font-bold tabular-nums">1,250</h3>
          </div>
        </div>
      </PageHero>

      <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto space-y-6">
        {/* Image hints */}
        <div className="grid grid-cols-2 gap-4">
          {IMAGE_HINTS.map((src, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden aspect-square"
            >
              <img
                src={src}
                alt="Hình ảnh gợi ý khái niệm triết học"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Answer slots */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3 text-center">
            Đáp án
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {ANSWER_SLOTS.map((letter, index) => {
              const isActive = letter === "_";
              const isFilled = letter && letter !== "_";
              return (
                <div
                  key={index}
                  className={`h-12 w-12 rounded-lg flex items-center justify-center font-bold text-xl border-2 transition-colors ${
                    isActive
                      ? "border-red-800 bg-red-50 text-red-800 animate-pulse"
                      : isFilled
                      ? "border-red-800 bg-red-800 text-white"
                      : "border-gray-200 bg-gray-50 text-gray-400"
                  }`}
                >
                  {isFilled ? letter : ""}
                </div>
              );
            })}
          </div>
        </div>

        {/* Letter buttons */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3 text-center">
            Chọn chữ cái
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {LETTERS.map((letter, index) => (
              <button
                type="button"
                key={index}
                className="h-12 w-12 rounded-lg bg-gray-100 hover:bg-red-800 hover:text-white font-bold text-lg transition-colors"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-colors"
          >
            Skip
          </button>
          <button
            type="button"
            className="bg-red-800 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-900 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">
              auto_awesome
            </span>
            Use AI Power-up
          </button>
        </div>

        {/* Quote */}
        <blockquote className="bg-blue-50 border-l-4 border-red-800 rounded-r-xl p-6 italic text-center text-gray-800">
          "Philosophy is the science which should prove to us that we are
          capable of making our own history."
        </blockquote>
      </div>
    </PageShell>
  );
};

export default ImageQuiz;
