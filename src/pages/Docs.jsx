import React from "react";
import PageShell, { PageHero } from "../components/PageShell";

// Trang PDF Docs — placeholder UI cho phần tài liệu
// Hiện danh sách tài liệu mẫu; phần upload/quản lý sẽ do BE đảm nhiệm sau này.
const SAMPLE_DOCS = [
  {
    id: "doc1",
    title: "Giáo trình Triết học Mác – Lênin",
    description: "Bản chính thức của Bộ Giáo dục và Đào tạo (dành cho bậc đại học)",
    pages: 320,
    size: "8.4 MB",
  },
  {
    id: "doc2",
    title: "Tổng hợp câu hỏi ôn tập Triết học",
    description: "200 câu hỏi tự luận có gợi ý đáp án theo từng chương",
    pages: 64,
    size: "1.2 MB",
  },
  {
    id: "doc3",
    title: "Tóm tắt sơ đồ tư duy toàn khoá",
    description: "Sơ đồ tư duy bố trí theo chương, dùng cho ôn thi cuối kỳ",
    pages: 28,
    size: "3.7 MB",
  },
];

export default function Docs() {
  return (
    <PageShell activeKey="docs">
      <PageHero
        eyebrow="Thư viện tài liệu"
        icon="description"
        title="PDF Docs"
        subtitle="Bộ sưu tập tài liệu Triết học Mác – Lênin. Tải về hoặc xem trực tuyến để hỗ trợ quá trình học tập."
      />

      <div className="px-6 md:px-12 py-10 max-w-5xl mx-auto">
            <div className="grid gap-4">
              {SAMPLE_DOCS.map((doc) => (
                <article
                  key={doc.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-start gap-5 hover:shadow-md transition-shadow"
                >
                  <div className="h-14 w-14 rounded-xl bg-red-50 text-red-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-3xl">
                      picture_as_pdf
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-lg text-gray-900 mb-1">
                      {doc.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          menu_book
                        </span>
                        {doc.pages} trang
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          database
                        </span>
                        {doc.size}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bg-red-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-900 transition-colors flex items-center gap-2 shrink-0"
                  >
                    <span className="material-symbols-outlined text-base">
                      download
                    </span>
                    Tải về
                  </button>
                </article>
              ))}
            </div>

            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900">
              <strong>Lưu ý:</strong> Trang tài liệu hiện đang ở chế độ
              demo. Tính năng tải file thực sự sẽ được kích hoạt khi
              backend hoàn thiện.
            </div>
      </div>
    </PageShell>
  );
}
