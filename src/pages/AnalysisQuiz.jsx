import React, { useState } from "react";
import PageShell, { PageHero } from "../components/PageShell";

const AnalysisQuiz = () => {
  const [answer, setAnswer] = useState("");

  return (
    <PageShell activeKey="quiz">
      <PageHero
        eyebrow="Chuyên đề 05"
        icon="menu_book"
        title="Phân tích Văn bản"
        subtitle='"Không có lý luận cách mạng thì cũng không có phong trào cách mạng." — V.I. Lenin'
      />

      <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto space-y-5">
        <article className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h3 className="font-bold text-red-800 uppercase text-xs tracking-wider mb-3">
            Đoạn văn phân tích
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Chủ nghĩa duy vật biện chứng khẳng định rằng mọi sự vật và hiện
            tượng trong thế giới đều vận động và phát triển thông qua mâu
            thuẫn nội tại của chính nó.
          </p>
        </article>

        <article className="bg-blue-50 border-l-4 border-red-800 rounded-r-xl p-6">
          <h3 className="font-bold text-red-800 uppercase text-xs tracking-wider mb-2">
            Câu hỏi
          </h3>
          <p className="text-gray-800 leading-relaxed">
            Hãy phân tích vai trò của mâu thuẫn trong sự phát triển của sự
            vật theo quan điểm duy vật biện chứng.
          </p>
        </article>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Nhập câu trả lời của bạn..."
          rows={8}
          className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 focus:border-red-800 outline-none resize-y font-medium text-gray-800"
        />

        <div className="flex justify-end gap-3">
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
            Nộp bài phân tích
          </button>
        </div>
      </div>
    </PageShell>
  );
};

export default AnalysisQuiz;
