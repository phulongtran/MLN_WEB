import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageShell, { PageHero } from "../components/PageShell";
import {
  MINDMAP_CHAPTERS,
  countSections,
  countLessons,
} from "../data/mindmapData";

// Đường dẫn tới trang Lesson kèm slug bài học
// Tách thành helper để các nơi gọi chỉ cần 1 lệnh duy nhất (Rule 3)
const buildLessonUrl = (slug) => `/lessons?lesson=${slug}`;

// --- Lọc dữ liệu mindmap theo từ khoá tìm kiếm ---
// Giữ những đề mục có tên hoặc bài học khớp keyword
function filterChaptersByKeyword(chapters, keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase();
  if (!normalizedKeyword) return chapters;

  const matchesKeyword = (text) =>
    text.toLowerCase().includes(normalizedKeyword);

  return chapters
    .map((chapter) => ({
      ...chapter,
      sections: chapter.sections
        .map((section) => ({
          ...section,
          lessons: section.lessons.filter((lesson) =>
            matchesKeyword(lesson.title)
          ),
        }))
        .filter(
          (section) =>
            section.lessons.length > 0 || matchesKeyword(section.title)
        ),
    }))
    .filter((chapter) => chapter.sections.length > 0);
}

// --- Nhánh nhỏ: 1 đề mục + danh sách bài học bên trong ---
function Branch({ section, onOpenLesson }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex items-center pt-6 shrink-0">
        <div className="h-0.5 w-8 bg-gray-400" />
      </div>

      <div className="flex-1">
        {/* Click đề mục -> mở bài học đầu tiên của đề mục đó */}
        <button
          onClick={() => onOpenLesson(section.lessons[0]?.slug)}
          className="group inline-flex items-center gap-2 bg-white border-2 border-red-800 text-red-800 font-bold px-5 py-2.5 rounded-xl shadow-sm hover:bg-red-800 hover:text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-base">topic</span>
          {section.title}
          <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100 transition-opacity">
            arrow_forward
          </span>
        </button>

        <div className="mt-3 ml-8 space-y-2 relative">
          <div className="absolute left-0 top-0 bottom-3 w-0.5 bg-gray-300" />
          {section.lessons.map((lesson) => (
            <div key={lesson.id} className="flex items-center gap-3">
              <div className="h-0.5 w-6 bg-gray-300" />
              <button
                onClick={() => onOpenLesson(lesson.slug)}
                className="group flex items-center gap-2 bg-blue-50 hover:bg-red-800 hover:text-white text-gray-800 px-4 py-2 rounded-lg border border-gray-200 hover:border-red-800 transition-all text-sm font-medium hover:shadow-md"
              >
                <span className="material-symbols-outlined text-sm text-red-800 group-hover:text-white transition-colors">
                  menu_book
                </span>
                {lesson.title}
                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Sơ đồ 1 chương: node gốc bên trái, các nhánh bên phải ---
function ChapterMap({ chapter, onOpenLesson }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-72 shrink-0">
          <div
            className={`bg-gradient-to-br ${chapter.color} text-white rounded-2xl p-6 shadow-xl sticky top-24`}
          >
            <span className="inline-block bg-white/20 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-3">
              {chapter.title}
            </span>
            <h2 className="font-bold text-2xl leading-tight mb-3">
              {chapter.subtitle}
            </h2>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span className="material-symbols-outlined text-base">
                account_tree
              </span>
              {countSections(chapter)} đề mục
              <span>·</span>
              {countLessons(chapter)} bài học
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8 relative">
          <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gray-300 hidden lg:block" />
          {chapter.sections.map((section) => (
            <Branch
              key={section.id}
              section={section}
              onOpenLesson={onOpenLesson}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Trang Mindmap: mục lục tổng dạng sơ đồ tư duy ---
export default function Mindmap() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const visibleChapters = useMemo(
    () => filterChaptersByKeyword(MINDMAP_CHAPTERS, searchKeyword),
    [searchKeyword]
  );

  const handleOpenLesson = (slug) => {
    if (!slug) return;
    navigate(buildLessonUrl(slug));
  };

  return (
    <PageShell activeKey="mindmap">
      <PageHero
        eyebrow="Mục lục tổng"
        icon="account_tree"
        title="Sơ đồ tư duy bài học"
        subtitle={
          <>
            Khám phá toàn bộ chương trình Triết học Mác – Lênin theo cấu trúc{" "}
            <strong>Chương → Đề mục → Bài học</strong>. Bấm vào bất kỳ nhánh
            nào để mở bài học tương ứng.
          </>
        }
      >
        <div className="relative max-w-xl">
          <input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            type="text"
            placeholder="Tìm bài học trong sơ đồ..."
            className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/50 rounded-full pl-12 pr-4 py-3 focus:ring-2 focus:ring-white focus:border-transparent outline-none backdrop-blur-sm"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/70">
            search
          </span>
        </div>
      </PageHero>

      <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
            {visibleChapters.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                <span className="material-symbols-outlined text-5xl text-gray-300">
                  search_off
                </span>
                <p className="text-gray-500 mt-2">
                  Không tìm thấy bài học khớp với "{searchKeyword}"
                </p>
              </div>
            ) : (
              visibleChapters.map((chapter) => (
                <ChapterMap
                  key={chapter.id}
                  chapter={chapter}
                  onOpenLesson={handleOpenLesson}
                />
              ))
            )}

            {/* Chú thích */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-800">
                  info
                </span>
                Cách đọc sơ đồ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-700 to-red-900" />
                  <span>
                    <strong>Sơ đồ lớn:</strong> Chương bài học
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-white border-2 border-red-800" />
                  <span>
                    <strong>Nhánh to:</strong> Đề mục (mở bài đầu tiên)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 border border-gray-200" />
                  <span>
                    <strong>Nhánh nhỏ:</strong> Bài học cụ thể
                  </span>
                </div>
              </div>
            </div>
      </div>
    </PageShell>
  );
}
