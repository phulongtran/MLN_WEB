import React, { useState } from "react";
import PageShell, { PageHero } from "../components/PageShell";

const EssayQuiz = () => {
  const [essay, setEssay] = useState("");

  return (
    <PageShell activeKey="quiz">
      <PageHero
        eyebrow="Chuyên đề 04"
        icon="edit_note"
        title="Tư duy Độc lập"
        subtitle='"Học thuyết của Marx là học thuyết vạn năng..." — V.I. Lenin'
      />

      <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto space-y-5">
        <div className="bg-blue-50 border-l-4 border-red-800 rounded-r-xl p-6">
          <h3 className="font-bold text-red-800 uppercase text-xs tracking-wider mb-2">
            Đề bài
          </h3>
          <p className="text-gray-800 leading-relaxed">
            Trình bày quan điểm cá nhân của bạn về luận điểm trên, vận dụng
            kiến thức đã học để phân tích.
          </p>
        </div>

        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Nhập phân tích hoặc câu trả lời..."
          rows={12}
          className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 focus:border-red-800 outline-none resize-y font-medium text-gray-800"
        />

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{essay.length} ký tự</span>
          <div className="flex gap-3">
            <button
              type="button"
              className="border-2 border-red-800 text-red-800 px-5 py-2.5 rounded-lg font-bold hover:bg-red-50 transition-colors"
            >
              Lưu bản nháp
            </button>
            <button
              type="button"
              className="bg-red-800 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-900 transition-colors"
            >
              Gửi câu trả lời
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default EssayQuiz;
