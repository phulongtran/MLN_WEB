// Hằng số dùng chung toàn bộ ứng dụng — gom về một nơi để tránh magic numbers/strings (Rule 6)

// --- Ngưỡng đánh giá Quiz ---
export const QUIZ_PASS_THRESHOLD = 3;          // Số câu đúng tối thiểu để qua quiz cuối bài
export const VIDEO_QUIZ_SIZE = 3;              // Số câu trong mini-quiz sau video

// --- Player podcast ---
export const PODCAST_SKIP_SECONDS = 10;        // Bước tua nhanh/lùi của podcast (giây)

// --- Cấu hình sidebar dùng chung (HomePages + Mindmap) ---
// Mỗi item có key để xác định trang đang active
export const SIDEBAR_NAV_ITEMS = [
  { key: "flashcards", to: "/flashcards", icon: "cards",        label: "Flashcards"  },
  { key: "debate",     to: "/debate",     icon: "diversity_3",  label: "Debate"      },
  { key: "lessons",    to: "/lessons",    icon: "menu_book",    label: "Lessons"     },
  { key: "quiz",       to: "/quiz",       icon: "quiz",         label: "Quiz System" },
  { key: "docs",       to: "/docs",       icon: "description",  label: "PDF Docs"    },  // route /docs nay co thuc, xem src/pages/Docs.jsx
  { key: "mindmap",    to: "/mindmap",    icon: "account_tree", label: "Mindmap"     },
];
