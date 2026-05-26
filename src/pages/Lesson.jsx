import React, { useMemo, useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageShell from "../components/PageShell";
import { useToast } from "../components/Toast";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  WARMUP_POOL,
  VIDEO_QUIZ_QUESTIONS,
  FINAL_QUIZ_QUESTIONS,
  PODCAST_EPISODE,
  SYLLABUS_ITEMS,
} from "../data/lessonContent";
import { QUIZ_PASS_THRESHOLD, PODCAST_SKIP_SECONDS } from "../constants";

// --- Helper tạo className cho 1 đáp án trắc nghiệm dựa trên trạng thái ---
// Tách ra để tránh lặp logic giữa các quiz (Rule 3 DRY)
function getOptionClassName({ submitted, picked, isCorrect, base, sizing }) {
  let cls = `${base} ${sizing} transition-all `;
  if (!submitted) {
    cls += picked
      ? "border-red-800 bg-red-50"
      : "border-gray-200 hover:border-red-300";
  } else if (isCorrect) {
    cls += "border-green-500 bg-green-50 text-green-900";
  } else if (picked) {
    cls += "border-red-400 bg-red-50 text-red-900";
  } else {
    cls += "border-gray-200 opacity-60";
  }
  return cls;
}

// --- Tiện ích định dạng thời gian giây -> mm:ss ---
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

/* ============================================================
   WARM-UP — chọn ngẫu nhiên 1 mục từ WARMUP_POOL mỗi lần mở bài
   ============================================================ */
function WarmupImageGuess({ data, onDone }) {
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const isCorrect =
    revealed || input.trim().toLowerCase() === data.answer.toLowerCase();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img
        src={data.image}
        alt="warmup"
        className="w-full h-64 object-cover rounded-xl"
      />
      <div>
        <p className="text-sm text-gray-600 mb-2">{data.hint}</p>
        <div className="font-mono text-3xl tracking-[0.4em] text-red-800 mb-4 bg-red-50 px-4 py-3 rounded-lg inline-block">
          {data.blanks}
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Gõ đáp án của bạn..."
          disabled={isCorrect}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-800 outline-none mb-3"
        />
        {isCorrect ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-sm">
            <span className="material-symbols-outlined align-middle text-base mr-1">
              check_circle
            </span>
            {data.reveal}
            <button
              onClick={onDone}
              className="block mt-3 bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-900"
            >
              Bắt đầu bài học →
            </button>
          </div>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className="text-sm text-gray-500 underline"
          >
            Bỏ qua / xem đáp án
          </button>
        )}
      </div>
    </div>
  );
}

function WarmupStory({ data, onDone }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const submitted = selectedIndex !== null;
  const isCorrect = selectedIndex === data.correctIndex;

  return (
    <div>
      <blockquote className="border-l-4 border-red-800 bg-red-50/40 pl-5 pr-3 py-4 italic text-gray-800 mb-5 rounded-r-lg">
        "{data.story}"
      </blockquote>
      <p className="font-semibold mb-3 text-gray-900">{data.question}</p>
      <div className="space-y-2 mb-4">
        {data.options.map((option, index) => (
          <button
            key={index}
            disabled={submitted}
            onClick={() => setSelectedIndex(index)}
            className={getOptionClassName({
              submitted,
              picked: index === selectedIndex,
              isCorrect: index === data.correctIndex,
              base: "block w-full text-left rounded-lg border-2",
              sizing: "px-4 py-3",
            })}
          >
            {option}
          </button>
        ))}
      </div>
      {submitted && (
        <div
          className={`p-3 rounded-lg text-sm ${
            isCorrect
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-amber-50 border border-amber-200 text-amber-800"
          }`}
        >
          <span className="material-symbols-outlined align-middle text-base mr-1">
            {isCorrect ? "check_circle" : "lightbulb"}
          </span>
          {data.reveal}
          <button
            onClick={onDone}
            className="block mt-3 bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-900"
          >
            Bắt đầu bài học →
          </button>
        </div>
      )}
    </div>
  );
}

function WarmupSection({ onDone }) {
  // useMemo để random chỉ chạy 1 lần khi mount bài học (Rule 9 KISS)
  const warmup = useMemo(
    () => WARMUP_POOL[Math.floor(Math.random() * WARMUP_POOL.length)],
    []
  );

  return (
    <div className="bg-white rounded-2xl shadow-md border border-amber-200 p-7 mb-8 relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-100 rounded-full opacity-50" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-amber-700">
            local_fire_department
          </span>
          <span className="text-xs uppercase tracking-wider text-amber-700 font-bold">
            Làm nóng / Đặt vấn đề
          </span>
        </div>
        <h2 className="text-2xl font-bold text-red-900 mb-5">{warmup.title}</h2>
        {warmup.type === "image-guess" ? (
          <WarmupImageGuess data={warmup} onDone={onDone} />
        ) : (
          <WarmupStory data={warmup} onDone={onDone} />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   VIDEO + QUIZ NHẮC LẠI
   ============================================================ */
function VideoQuiz() {
  const { showToast } = useToast();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const allAnswered = VIDEO_QUIZ_QUESTIONS.every((_, i) => i in answers);
  const score = VIDEO_QUIZ_QUESTIONS.filter(
    (q, i) => answers[i] === q.correctIndex
  ).length;

  const handleSubmit = () => {
    setSubmitted(true);
    showToast(
      `Đã nộp bài • ${score}/${VIDEO_QUIZ_QUESTIONS.length} câu đúng`,
      score === VIDEO_QUIZ_QUESTIONS.length ? "success" : "info"
    );
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-amber-50 border border-red-200 rounded-2xl p-6 mt-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-red-800">
          track_changes
        </span>
        <span className="text-xs uppercase tracking-wider text-red-800 font-bold">
          Quiz nhanh nhắc lại video
        </span>
      </div>
      <h3 className="font-bold text-red-900 mb-4 text-lg">
        Bạn nhớ được gì từ video?
      </h3>

      <div className="space-y-5">
        {VIDEO_QUIZ_QUESTIONS.map((q, qIndex) => (
          <div key={qIndex}>
            <p className="font-semibold mb-2">
              {qIndex + 1}. {q.question}
            </p>
            <div className="space-y-1.5">
              {q.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [qIndex]: optIndex })}
                  className={getOptionClassName({
                    submitted,
                    picked: answers[qIndex] === optIndex,
                    isCorrect: optIndex === q.correctIndex,
                    base: "w-full text-left rounded-lg border bg-white",
                    sizing: "px-3 py-2 text-sm",
                  })}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          disabled={!allAnswered}
          onClick={handleSubmit}
          className="mt-5 bg-red-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-900 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Nộp bài
        </button>
      ) : (
        <div className="mt-5 bg-white border border-green-300 rounded-lg p-4">
          <p className="font-bold text-green-800">
            <span className="material-symbols-outlined align-middle mr-1">
              check_circle
            </span>
            Bạn đúng {score}/{VIDEO_QUIZ_QUESTIONS.length} câu
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Tiếp tục đọc nội dung bài học bên dưới để hiểu sâu hơn.
          </p>
        </div>
      )}
    </div>
  );
}

function VideoWithReminder() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden shadow-md">
        {!isPlaying ? (
          <>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH2B61U2pvTiqNDznECZTR6c23wIvgyi4J5Ll15gv5cUcLbGLXLY2OtCE2hK2emP701nZiEfixugjSnyoapb_RmWY-NgGH0sklSpAXr2EvHwZVYz6JBvtwA_f0tRCiz1elSBM6ODysHkj8mwpLevHY67mGVpWvpU039VV8EHDrHNt0H3Tcg2gcgIvvxsuLwQCsHTF96fzS8DDhE6laJCgSIaWW2_VIcfLKJ1SJho3Ef52utpQwgPAkP6TVWVvtmHTGHqsTHD68LJo"
              alt="Bia bai hoc"
              className="w-full block"
            />
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label="Phat video bai hoc"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-red-800/90 hover:bg-red-900 text-white flex items-center justify-center transition-transform hover:scale-110"
            >
              <span className="material-symbols-outlined text-4xl">
                play_arrow
              </span>
            </button>
          </>
        ) : (
          <iframe
            title="lesson-video"
            width="100%"
            height="430"
            src="https://www.youtube.com/embed/Mzg-AdRrjGY?autoplay=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="block"
          />
        )}
      </div>
      {isPlaying && !hasWatched && (
        <button
          onClick={() => setHasWatched(true)}
          className="mt-3 bg-red-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-900 text-sm"
        >
          <span className="material-symbols-outlined align-middle text-base mr-1">
            check
          </span>
          Tôi đã xem xong video
        </button>
      )}
      {hasWatched && <VideoQuiz />}
    </div>
  );
}

/* ============================================================
   QUIZ TỔNG KẾT CUỐI BÀI
   ============================================================ */
function FinalQuiz() {
  const { showToast } = useToast();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const allAnswered = FINAL_QUIZ_QUESTIONS.every((_, i) => i in answers);
  const score = FINAL_QUIZ_QUESTIONS.filter(
    (q, i) => answers[i] === q.correctIndex
  ).length;
  const passed = score >= QUIZ_PASS_THRESHOLD;

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    showToast(
      passed
        ? `Xuất sắc! Bạn đã qua bài với ${score}/${FINAL_QUIZ_QUESTIONS.length} câu đúng.`
        : `Bạn đạt ${score}/${FINAL_QUIZ_QUESTIONS.length} câu — chưa đủ điểm qua bài.`,
      passed ? "success" : "warning"
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-red-200 p-7 mt-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-red-800">
          assignment
        </span>
        <span className="text-xs uppercase tracking-wider text-red-800 font-bold">
          Quiz ôn tập cuối bài
        </span>
      </div>
      <h2 className="text-2xl font-bold text-red-900 mb-2">
        Kiểm tra tổng kết
      </h2>
      <p className="text-gray-600 text-sm mb-5">
        Hoàn thành {FINAL_QUIZ_QUESTIONS.length} câu hỏi để chứng nhận hoàn
        thành bài học. Đạt {QUIZ_PASS_THRESHOLD}/{FINAL_QUIZ_QUESTIONS.length}{" "}
        câu để qua bài.
      </p>

      <div className="space-y-6">
        {FINAL_QUIZ_QUESTIONS.map((q, qIndex) => (
          <div
            key={qIndex}
            className="border-b border-gray-100 pb-5 last:border-0"
          >
            <p className="font-semibold mb-3 text-gray-900">
              Câu {qIndex + 1}. {q.question}
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {q.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [qIndex]: optIndex })}
                  className={getOptionClassName({
                    submitted,
                    picked: answers[qIndex] === optIndex,
                    isCorrect: optIndex === q.correctIndex,
                    base: "text-left rounded-lg border-2",
                    sizing: "px-4 py-3 text-sm",
                  })}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          disabled={!allAnswered}
          onClick={handleSubmit}
          className="mt-6 bg-red-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-900 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Nộp bài quiz
        </button>
      ) : (
        <div
          className={`mt-6 p-5 rounded-xl ${
            passed
              ? "bg-green-50 border-2 border-green-300"
              : "bg-amber-50 border-2 border-amber-300"
          }`}
        >
          <div className="text-3xl font-bold mb-2">
            {score}/{FINAL_QUIZ_QUESTIONS.length} câu đúng
          </div>
          <p className={passed ? "text-green-800" : "text-amber-800"}>
            {passed
              ? "Xuất sắc! Bạn đã hoàn thành bài học này."
              : "Hãy ôn lại lý thuyết và thử lại nhé."}
          </p>
          <button
            onClick={resetQuiz}
            className="mt-3 text-sm underline text-gray-600"
          >
            Làm lại
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PODCAST PLAYER kiểu Spotify Lyrics — câu đang nói sẽ sáng lên
   ============================================================ */
function PodcastPlayer() {
  const audioRef = useRef(null);
  const lineRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const episode = PODCAST_EPISODE;

  // Tìm dòng đang phát: dòng cuối cùng có timestamp <= currentTime
  const activeLineIndex = useMemo(() => {
    let foundIndex = -1;
    for (let i = 0; i < episode.transcript.length; i++) {
      if (episode.transcript[i].t <= currentTime) foundIndex = i;
      else break;
    }
    return foundIndex;
  }, [currentTime, episode.transcript]);

  // Tự động cuộn dòng đang phát vào giữa khung transcript
  useEffect(() => {
    const lineElement = lineRefs.current[activeLineIndex];
    if (lineElement) {
      lineElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeLineIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const seekTo = (timeInSeconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = timeInSeconds;
    setCurrentTime(timeInSeconds);
    if (!isPlaying) audio.play();
  };

  const handleSeekBarChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const getLineClassName = (lineIndex) => {
    const isActive = lineIndex === activeLineIndex;
    const isPast = lineIndex < activeLineIndex;
    if (isActive) {
      return "block w-full text-left text-white text-xl font-bold scale-[1.02] origin-left transition-all duration-300 leading-snug";
    }
    if (isPast) {
      return "block w-full text-left text-white/40 text-base hover:text-white/70 transition-all duration-300 leading-snug";
    }
    return "block w-full text-left text-white/55 text-base hover:text-white/80 transition-all duration-300 leading-snug";
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 rounded-2xl shadow-xl p-7 mt-8 text-white relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-indigo-200">
            headphones
          </span>
          <span className="text-xs uppercase tracking-wider text-indigo-200 font-bold">
            Podcast bài học
          </span>
        </div>

        {/* Header: cover + tiêu đề */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={episode.cover}
            alt="cover"
            className="h-20 w-20 rounded-xl object-cover shadow-lg shrink-0"
          />
          <div className="min-w-0">
            <h2 className="text-2xl font-bold truncate">{episode.title}</h2>
            <p className="text-indigo-200 text-sm">{episode.host}</p>
          </div>
        </div>

        {/* Transcript đồng bộ */}
        <div className="bg-black/30 backdrop-blur rounded-xl p-5 mb-5 max-h-72 overflow-y-auto scroll-smooth">
          <div className="space-y-3">
            {episode.transcript.map((line, index) => (
              <button
                key={index}
                ref={(el) => (lineRefs.current[index] = el)}
                onClick={() => seekTo(line.t)}
                className={getLineClassName(index)}
              >
                {line.text}
              </button>
            ))}
          </div>
        </div>

        {/* Thanh điều khiển */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 text-xs text-indigo-200">
            <span className="tabular-nums">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={handleSeekBarChange}
              className="flex-1 accent-white"
            />
            <span className="tabular-nums">{formatTime(duration)}</span>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() =>
                seekTo(Math.max(0, currentTime - PODCAST_SKIP_SECONDS))
              }
              className="text-white/80 hover:text-white"
              title={`Lùi ${PODCAST_SKIP_SECONDS}s`}
            >
              <span className="material-symbols-outlined">fast_rewind</span>
            </button>
            <button
              onClick={togglePlay}
              className="h-14 w-14 rounded-full bg-white text-indigo-900 flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
            >
              <span className="material-symbols-outlined text-3xl">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button
              onClick={() =>
                seekTo(Math.min(duration, currentTime + PODCAST_SKIP_SECONDS))
              }
              className="text-white/80 hover:text-white"
              title={`Tiến ${PODCAST_SKIP_SECONDS}s`}
            >
              <span className="material-symbols-outlined">fast_forward</span>
            </button>
          </div>
          <audio
            ref={audioRef}
            src={episode.src}
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAP trạng thái syllabus -> material icon + Tailwind class
   ============================================================ */
const SYLLABUS_STATUS_CONFIG = {
  completed: {
    icon: "check_circle",
    className: "bg-green-50 text-green-800 border-green-200",
  },
  active: {
    icon: "play_circle",
    className: "bg-red-50 text-red-800 border-red-300 font-semibold",
  },
  locked: {
    icon: "lock",
    className: "bg-gray-50 text-gray-400 border-gray-200",
  },
};

/* ============================================================
   PAGE chính
   ============================================================ */
// Doc slug bai hoc tu URL va doi sang ten hien thi
// Vi dien tat ca lesson dang dung chung 1 trang -> map sang badge thong tin
const SLUG_TO_LABEL = {
  "pham-tru-vat-chat": "Phạm trù vật chất",
  "phuong-thuc-ton-tai": "Phương thức tồn tại của vật chất",
  "ban-chat-y-thuc": "Nguồn gốc và bản chất của ý thức",
  "quan-he-vc-yt": "Mối quan hệ vật chất – ý thức",
  "hai-nguyen-ly": "Hai nguyên lý cơ bản",
  "cap-pham-tru": "Các cặp phạm trù",
  "ba-quy-luat": "Ba quy luật cơ bản",
};

const Lesson = () => {
  const [searchParams] = useSearchParams();
  const lessonSlug = searchParams.get("lesson");
  const lessonLabelFromSlug = lessonSlug ? SLUG_TO_LABEL[lessonSlug] : null;

  // Luu trang thai warmup vao localStorage de F5 khong mat
  const [isWarmupDone, setIsWarmupDone] = useLocalStorage(
    "mln_warmup_done",
    false
  );

  return (
    <PageShell activeKey="lessons">
      <div className="px-6 md:px-12 py-8 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
          <span>Trang chủ</span>
          <span>›</span>
          <span>Bài học</span>
          <span>›</span>
          <strong className="text-red-800">
            {lessonLabelFromSlug || "Chủ nghĩa duy vật biện chứng"}
          </strong>
        </div>

        {/* Header bài học */}
        <header className="mb-8">
          {lessonLabelFromSlug && (
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-full text-xs font-bold mb-3">
              <span className="material-symbols-outlined text-base">
                bookmark
              </span>
              Bạn đang xem: {lessonLabelFromSlug}
            </div>
          )}
          <h1 className="font-bold text-3xl md:text-4xl text-red-900 mb-3">
            Bài 1: Vật chất và các hình thức tồn tại của vật chất
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
              Triết học
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              45 phút
            </span>
          </div>
        </header>

        {/* Warm-up chỉ hiển thị khi chưa hoàn thành */}
        {!isWarmupDone && (
          <WarmupSection onDone={() => setIsWarmupDone(true)} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VideoWithReminder />

            {/* Lesson body */}
            <article className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-6">
              <blockquote className="border-l-4 border-red-800 bg-red-50/40 pl-5 pr-3 py-4 rounded-r-lg">
                <p className="italic text-xl text-red-900 leading-relaxed mb-2">
                  "Vật chất là một phạm trù triết học dùng để chỉ thực tại
                  khách quan được đem lại cho con người trong cảm giác..."
                </p>
                <span className="text-sm text-gray-500">
                  — V.I. Lênin, Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm
                  phê phán
                </span>
              </blockquote>

              <section>
                <h2 className="text-2xl font-bold text-red-900 mb-3">
                  1. Định nghĩa vật chất của Lênin
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Định nghĩa của Lênin về vật chất bao quát ba nội dung cơ
                  bản, giúp giải quyết triệt để hai mặt của vấn đề cơ bản
                  của triết học.
                </p>
                <ul className="space-y-2 text-gray-700 leading-relaxed">
                  <li>
                    <strong className="text-red-900">Thứ nhất:</strong> Vật
                    chất là cái có trước, ý thức là cái có sau.
                  </li>
                  <li>
                    <strong className="text-red-900">Thứ hai:</strong> Vật
                    chất là cái mà con người có thể nhận thức được qua cảm
                    giác.
                  </li>
                </ul>
              </section>

              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <h4 className="font-bold text-gray-900 mb-3">Sơ đồ tư duy</h4>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2T0oKzFgSs41_uPl7DH2lLOTYb3SxDZB_kd8GpeTjioOwrYtiKCHxMgA988xiG38bbJ6kHsbcaZ6NB5fwVhU-hX_fuk1yMDbzNQlf7hVZ55UPqUd7F8NC9JKADq4NeFoNN0S_dhU3TjhBNdbUIQGm28SveS2d-P7aiKpHJiufcGzd1wxH_9SoofRYAN_LDJsikyZtKm4WUEIn_R8NblvXegmi4LrZflrHd4Uz2wH7Y9W_TOWXBmiRAPWefJZFVQFDn-sJDNu7M6s"
                  alt="So do tu duy bai hoc"
                  className="w-full rounded-lg"
                />
              </div>

              <section>
                <h2 className="text-2xl font-bold text-red-900 mb-3">
                  2. Các hình thức tồn tại của vật chất
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Theo quan điểm duy vật biện chứng, vận động là phương thức
                  tồn tại của vật chất.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                    <h5 className="font-bold text-red-900 mb-2">
                      Vận động cơ học
                    </h5>
                    <p className="text-gray-700 text-sm">
                      Sự thay đổi vị trí của các vật thể trong không gian.
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                    <h5 className="font-bold text-red-900 mb-2">
                      Vận động vật lý
                    </h5>
                    <p className="text-gray-700 text-sm">
                      Vận động của các phân tử và các quá trình nhiệt, điện.
                    </p>
                  </div>
                </div>
              </section>
            </article>

            <PodcastPlayer />

            <FinalQuiz />

            {/* Bottom navigation */}
            <div className="flex justify-between gap-3">
              <button
                type="button"
                className="border-2 border-red-800 text-red-800 px-5 py-3 rounded-lg font-bold hover:bg-red-800 hover:text-white transition-colors"
              >
                ← Bài trước
              </button>
              <button
                type="button"
                className="bg-red-800 text-white px-5 py-3 rounded-lg font-bold hover:bg-red-900 transition-colors"
              >
                Bài tiếp theo →
              </button>
            </div>
          </div>

          {/* Sidebar syllabus */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden sticky top-20">
              <div className="bg-red-800 text-white p-5">
                <h3 className="font-bold text-lg mb-3">Nội dung khóa học</h3>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: "16%" }}
                  />
                </div>
                <p className="text-sm text-white/80 mt-2">
                  Đã hoàn thành 2/12 bài học
                </p>
              </div>

              <div className="p-4 space-y-2">
                {SYLLABUS_ITEMS.map((item, index) => {
                  const config = SYLLABUS_STATUS_CONFIG[item.status];
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm ${config.className}`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {config.icon}
                      </span>
                      <span className="flex-1">{item.title}</span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="w-full bg-gray-700 text-white py-3 font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  download
                </span>
                Tài liệu đi kèm (PDF)
              </button>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
};

export default Lesson;
