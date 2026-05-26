import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageShell, { PageHero, StartDailyLessonButton } from "../components/PageShell";

// Cau hinh cac module quiz cua he thong
const QUIZ_MODULES = [
  {
    icon: "quiz",
    level: "Nâng cao",
    title: "Trắc nghiệm Tổng hợp",
    desc: "Kiểm tra kiến thức qua các câu hỏi đa lựa chọn.",
    progress: 10,
    question: "2/25 câu",
    link: "/quiz/mcq",
  },
  {
    icon: "edit_note",
    level: "Trung bình",
    title: "Tư duy Độc lập",
    desc: "Trả lời các câu hỏi tự luận ngắn và phân tích.",
    progress: 45,
    question: "9/20 câu",
    link: "/quiz/essay",
  },
  {
    icon: "cards",
    level: "Cơ bản",
    title: "Thử thách Kết nối",
    desc: "Nối khái niệm với định nghĩa chính xác.",
    progress: 80,
    question: "12/15 câu",
    link: "/quiz/matching",
  },
  {
    icon: "menu_book",
    level: "Cơ bản",
    title: "Phân tích Văn bản",
    desc: "Đọc đoạn trích và trả lời câu hỏi.",
    progress: 100,
    question: "20/20 câu",
    link: "/quiz/analysis",
  },
  {
    icon: "image_search",
    level: "Trung bình",
    title: "Đuổi Hình Bắt Triết Học",
    desc: "Giải mã các khái niệm qua hình ảnh minh họa.",
    progress: 0,
    question: "0/30 câu",
    link: "/image-quiz",
  },
];

const QUIZ_FILTERS = ["Tất cả", "Duy vật", "Biện chứng", "Lịch sử"];

const Quiz = () => {
  const [activeFilter, setActiveFilter] = useState(QUIZ_FILTERS[0]);

  return (
    <PageShell activeKey="quiz" footer={StartDailyLessonButton}>
      <PageHero
        eyebrow="Quiz System"
        icon="quiz"
        title="Hệ thống Kiểm tra Kiến thức"
        subtitle='"Các nhà triết học đã chỉ giải thích thế giới bằng nhiều cách khác nhau, song vấn đề là cải tạo thế giới." — Karl Marx'
      >
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm chương học hoặc chủ đề..."
              className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/50 rounded-full pl-12 pr-4 py-3 focus:ring-2 focus:ring-white focus:border-transparent outline-none backdrop-blur-sm"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/70">
              search
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {QUIZ_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-white text-red-800"
                  : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </PageHero>

      <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <h2 className="font-bold text-3xl text-gray-900 mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-red-800">
            psychology
          </span>
          Các module luyện tập
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUIZ_MODULES.map((quiz) => (
            <Link
              to={quiz.link}
              key={quiz.link}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-red-50 text-red-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">
                    {quiz.icon}
                  </span>
                </div>
                <span className="text-xs font-bold uppercase bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {quiz.level}
                </span>
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {quiz.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {quiz.desc}
              </p>

              <div className="mt-auto">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600">
                    Hoàn thành {quiz.progress}%
                  </span>
                  <span className="text-red-800 font-bold">
                    {quiz.question}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-800 h-2 rounded-full transition-all"
                    style={{ width: `${quiz.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}

          {/* Special challenge card */}
          <div className="bg-gradient-to-br from-red-700 to-red-900 p-5 rounded-xl shadow-md text-white border border-red-900 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">
                  auto_awesome
                </span>
              </div>
              <span className="text-xs font-bold uppercase bg-white/20 px-2 py-1 rounded">
                Thử thách
              </span>
            </div>

            <h3 className="font-bold text-lg mb-2">Ôn tập Tổng hợp</h3>
            <p className="text-white/80 text-sm mb-4 flex-1">
              Sự kết hợp ngẫu nhiên của tất cả các dạng bài tập.
            </p>

            <button
              type="button"
              className="bg-white text-red-800 font-semibold py-2 rounded-lg hover:bg-red-50 transition-all"
            >
              Bắt đầu ngay
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default Quiz;
