import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageShell, { PageHero } from "../components/PageShell";

// Du lieu the cua tung chuong — sau nay BE se cung cap
const FLASHCARD_DATA = {
  1: {
    title: "Nhập môn Triết học",
    cards: [
      {
        front: "Triết học là gì?",
        back: "Triết học là hệ thống tri thức lý luận chung nhất về thế giới và vị trí con người.",
      },
      {
        front: "Đối tượng nghiên cứu của triết học?",
        back: "Nghiên cứu các quy luật chung nhất của tự nhiên, xã hội và tư duy.",
      },
    ],
  },
  2: {
    title: "Chủ nghĩa Duy vật Biện chứng",
    cards: [
      {
        front: "Vật chất là gì?",
        back: "Vật chất là phạm trù triết học dùng để chỉ thực tại khách quan.",
      },
      {
        front: "Ý thức là gì?",
        back: "Ý thức là sự phản ánh thế giới khách quan vào bộ não con người.",
      },
    ],
  },
  3: {
    title: "Phép Biện chứng Duy vật",
    cards: [
      {
        front: "Quy luật lượng chất?",
        back: "Sự thay đổi về lượng dẫn đến thay đổi về chất.",
      },
    ],
  },
  4: {
    title: "Học thuyết Giá trị Thặng dư",
    cards: [
      {
        front: "Giá trị thặng dư là gì?",
        back: "Là phần giá trị mới dôi ra ngoài giá trị sức lao động do công nhân tạo ra.",
      },
    ],
  },
  5: {
    title: "Chủ nghĩa Duy vật Lịch sử",
    cards: [
      {
        front: "Hình thái kinh tế xã hội là gì?",
        back: "Là xã hội ở từng giai đoạn lịch sử nhất định với kiểu quan hệ sản xuất đặc trưng.",
      },
    ],
  },
};

const FlashcardDetail = () => {
  const { id } = useParams();
  const chapter = FLASHCARD_DATA[id];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!chapter) {
    return (
      <PageShell activeKey="flashcards">
        <div className="px-12 py-16 max-w-3xl mx-auto text-center">
          <span className="material-symbols-outlined text-7xl text-gray-300">
            search_off
          </span>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Không tìm thấy chương học
          </h1>
          <Link
            to="/flashcards"
            className="inline-block mt-6 bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-900"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </PageShell>
    );
  }

  const currentCard = chapter.cards[currentIndex];
  const totalCards = chapter.cards.length;

  const goToNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  return (
    <PageShell activeKey="flashcards">
      <PageHero
        eyebrow={`Flashcard ${currentIndex + 1} / ${totalCards}`}
        icon="cards"
        title={chapter.title}
        subtitle="Bấm vào thẻ để lật xem mặt sau. Dùng nút bên dưới để chuyển thẻ."
      />

      <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
        {/* Flashcard with flip effect */}
        <button
          type="button"
          onClick={() => setIsFlipped((prev) => !prev)}
          className="w-full block"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative w-full h-80 transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT */}
            <div
              className="absolute inset-0 bg-white border-2 border-red-800 rounded-2xl shadow-xl flex items-center justify-center p-8"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-center">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider text-red-800 font-bold bg-red-50 rounded-full mb-4">
                  Câu hỏi
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {currentCard.front}
                </h2>
                <p className="text-gray-500 text-sm">Bấm để lật ↻</p>
              </div>
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 bg-red-800 text-white rounded-2xl shadow-xl flex items-center justify-center p-8"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="text-center">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-white/20 rounded-full mb-4">
                  Câu trả lời
                </span>
                <h2 className="text-2xl font-semibold leading-relaxed">
                  {currentCard.back}
                </h2>
              </div>
            </div>
          </div>
        </button>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="border-2 border-red-800 text-red-800 px-6 py-3 rounded-lg font-bold hover:bg-red-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <span className="text-gray-500 font-semibold">
            {currentIndex + 1} / {totalCards}
          </span>

          <button
            type="button"
            onClick={goToNext}
            disabled={currentIndex === totalCards - 1}
            className="bg-red-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/flashcards"
            className="text-sm text-gray-500 underline hover:text-red-800"
          >
            ← Quay lại danh sách chương
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default FlashcardDetail;
