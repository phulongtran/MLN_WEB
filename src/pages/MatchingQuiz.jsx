import React from "react";
import PageShell, { PageHero } from "../components/PageShell";

const CONCEPTS = [
  "Chủ nghĩa Duy vật Biện chứng",
  "Hình thái Kinh tế – Xã hội",
  "Quy luật Lượng – Chất",
  "Giá trị Thặng dư",
  "Tồn tại Xã hội",
];

const DEFINITIONS = [
  "Sự thay đổi về lượng đến mức độ nhất định dẫn đến thay đổi về chất.",
  "Toàn bộ sinh hoạt vật chất và những điều kiện sinh hoạt vật chất của xã hội.",
  "Thế giới quan khoa học của giai cấp công nhân.",
  "Phần giá trị do lao động của công nhân tạo ra ngoài giá trị sức lao động.",
  "Xã hội ở một giai đoạn lịch sử nhất định.",
];

const MatchingQuiz = () => {
  return (
    <PageShell activeKey="quiz">
      <PageHero
        eyebrow="Chuyên đề 02"
        icon="cards"
        title="Thử thách Kết nối Triết học"
        subtitle="Nối các khái niệm ở cột trái với định nghĩa chính xác ở cột phải."
      >
        <div className="flex gap-6 mt-2">
          <div>
            <span className="text-xs uppercase text-white/70 tracking-wider">
              Thời gian
            </span>
            <h3 className="text-2xl font-bold tabular-nums">00:00</h3>
          </div>
          <div className="border-l border-white/20" />
          <div>
            <span className="text-xs uppercase text-white/70 tracking-wider">
              Tiến độ
            </span>
            <h3 className="text-2xl font-bold">0 / 5</h3>
          </div>
        </div>
      </PageHero>

      <div className="px-6 md:px-12 py-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left column — concepts */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3">
              Khái niệm
            </h4>
            <div className="space-y-3">
              {CONCEPTS.map((concept, index) => (
                <button
                  type="button"
                  key={index}
                  className="w-full text-left bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm hover:border-red-800 hover:shadow-md transition-all font-semibold text-gray-800"
                >
                  {concept}
                </button>
              ))}
            </div>
          </div>

          {/* Right column — definitions */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3">
              Định nghĩa
            </h4>
            <div className="space-y-3">
              {DEFINITIONS.map((definition, index) => (
                <button
                  type="button"
                  key={index}
                  className="w-full text-left bg-blue-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm hover:border-red-800 hover:bg-red-50 hover:shadow-md transition-all text-gray-700 text-sm"
                >
                  {definition}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Chọn khái niệm trước, sau đó chọn định nghĩa tương ứng.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="border-2 border-red-800 text-red-800 px-5 py-2.5 rounded-lg font-bold hover:bg-red-50 transition-colors"
            >
              Xem đáp án
            </button>
            <button
              type="button"
              className="bg-red-800 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-900 transition-colors"
            >
              Gửi bài làm
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default MatchingQuiz;
