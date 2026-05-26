import React, { useState } from "react";
import PageShell, { PageHero } from "../components/PageShell";
import { useToast } from "../components/Toast";

const QUESTIONS = [
  {
    question: "Ai là người sáng lập chủ nghĩa duy vật biện chứng?",
    options: ["Karl Marx", "Lenin", "Hegel", "Engels"],
    correctIndex: 0,
  },
  {
    question:
      "Theo triết học Mác-Lênin, vật chất có trước hay ý thức có trước?",
    options: [
      "Ý thức có trước",
      "Vật chất có trước",
      "Cả hai xuất hiện cùng lúc",
      "Không xác định",
    ],
    correctIndex: 1,
  },
  {
    question: "Quy luật nào nói về sự thay đổi từ lượng thành chất?",
    options: [
      "Quy luật phủ định của phủ định",
      "Quy luật thống nhất và đấu tranh",
      "Quy luật lượng – chất",
      "Quy luật phát triển",
    ],
    correctIndex: 2,
  },
];

const MCQQuiz = () => {
  const { showToast } = useToast();
  const [answers, setAnswers] = useState({});

  const handleSubmit = () => {
    const answered = Object.keys(answers).length;
    if (answered < QUESTIONS.length) {
      showToast(
        `Bạn còn ${QUESTIONS.length - answered} câu chưa trả lời.`,
        "warning"
      );
      return;
    }
    const correctCount = QUESTIONS.filter(
      (q, i) => answers[i] === q.correctIndex
    ).length;
    showToast(
      `Kết quả: ${correctCount}/${QUESTIONS.length} câu đúng`,
      correctCount === QUESTIONS.length ? "success" : "info"
    );
  };

  return (
    <PageShell activeKey="quiz">
      <PageHero
        eyebrow="Chuyên đề 03"
        icon="quiz"
        title="Trắc nghiệm Tổng hợp"
        subtitle='"Không có lý luận cách mạng thì không có phong trào cách mạng." — V.I. Lenin'
      />

      <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto space-y-5">
        {QUESTIONS.map((item, qIndex) => (
          <div
            key={qIndex}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
          >
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Câu {qIndex + 1}: {item.question}
            </h3>
            <div className="space-y-2">
              {item.options.map((option, optIndex) => {
                const isPicked = answers[qIndex] === optIndex;
                return (
                  <label
                    key={optIndex}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      isPicked
                        ? "border-red-800 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      checked={isPicked}
                      onChange={() =>
                        setAnswers({ ...answers, [qIndex]: optIndex })
                      }
                      className="accent-red-800"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="border-2 border-red-800 text-red-800 px-5 py-2.5 rounded-lg font-bold hover:bg-red-50 transition-colors"
          >
            Làm lại
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-red-800 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-red-900 transition-colors"
          >
            Nộp bài
          </button>
        </div>
      </div>
    </PageShell>
  );
};

export default MCQQuiz;
