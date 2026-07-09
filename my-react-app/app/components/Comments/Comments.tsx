import { useState, useRef, useEffect } from "react";
import styles from "./comments.module.css";
import { getCookie } from "~/tools/getCookie";
import { v4 as uuidv4 } from "uuid";

const MOCK_COMMENTS = [
  {
    id: 1,
    user: "Omar Makran",
    text: "Incredible cinematography, the director really outdid himself on this one. Every frame feels like a painting.",
    time: "2 hours ago",
    isOwn: true,
  },
  {
    id: 2,
    user: "Salah eddin",
    text: "Watched it twice already and I keep noticing new details. The soundtrack is amazing too! 🎬",
    time: "5 hours ago",
    isOwn: false,
  },
  {
    id: 3,
    user: "Melmousa",
    text: "The plot twist at the end completely caught me off guard. Brilliant writing.",
    time: "1 day ago",
    isOwn: false,
  },
  {
    id: 4,
    user: "Lucas Martin",
    text: "Not my favorite from this director honestly, but the performances were solid. The lead actor deserved an award for this role.",
    time: "2 days ago",
    isOwn: false,
  },
  {
    id: 5,
    user: "Elena Voss",
    text: "Can we talk about the ending? I need someone to explain what happened in the last 10 minutes 😅",
    time: "3 days ago",
    isOwn: false,
  },
  {
    id: 6,
    user: "James Wu",
    text: "Top 5 movies of the year for me. The pacing was perfect.",
    time: "4 days ago",
    isOwn: false,
  },
  {
    id: 7,
    user: "Maria Gonzalez",
    text: "The score during the chase scene gave me chills. Hans Zimmer vibes for sure.",
    time: "5 days ago",
    isOwn: false,
  },
  {
    id: 8,
    user: "Yuki Tanaka",
    text: "Finally someone recommended this to me. No regrets at all, what a masterpiece!",
    time: "1 week ago",
    isOwn: false,
  },
];

const EMOJI_SET = [
  "😀",
  "😂",
  "😍",
  "🔥",
  "👏",
  "💯",
  "🎬",
  "❤️",
  "😢",
  "😮",
  "🤔",
  "👎",
  "💀",
  "🍿",
  "⭐",
  "😱",
  "🥰",
  "👀",
  "🙌",
  "😤",
  "🎭",
];

const INITIAL_SHOW = 3;

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const CommentsSection = ({ identifier }: { identifier: string }) => {
  const [comments, setComments] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  const visibleComments = showAll ? comments : comments.slice(0, INITIAL_SHOW);
  const hiddenCount = comments.length - INITIAL_SHOW;
  const canSend = inputValue.trim().length > 0;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
    };
    if (showEmoji) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showEmoji]);

  const handleInput = (val: string) => {
    setInputValue(val);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    const token = getCookie(document.cookie, "token");
    if (!token) return;
    if (!canSend) return;
    // const newComment = {
    //   id: Date.now(),
    //   user: "Omar Makran",
    //   text: inputValue.trim(),
    //   time: "Just now",
    //   isOwn: true,
    // };

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/stream/comments?identifier="${identifier}"&page=1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movie_id: identifier,
          comments: inputValue,
          user_name: "salah",
        }),
      }
    ).then((res) => {
      console.log(res);
      setComments([
        ...comments,
        {
          // user_name: "kljgladsjlfdklsj",
          comments: inputValue,
        },
      ]);
    });

    // setComments([...comments, {
    //   comments: inputValue,

    // }]);
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  // const handleDelete = (id: number) => {
  //   setDeletingId(id);
  //   setTimeout(() => {
  //     setComments((prev) => prev.filter((c) => c.id !== id));
  //     setDeletingId(null);
  //   }, 320);
  // };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertEmoji = (emoji: string) => {
    setInputValue((prev) => prev + emoji);
    setShowEmoji(false);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    const token = getCookie(document.cookie, "token");
    if (!token) return;
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/stream/comments?identifier="${identifier}"&page=2`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        res.json().then((jres) => {
          console.log(jres);
          setComments(jres.results);
        });
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={styles.commentsSection}>
      <div className={styles.commentsHeader}>
        <div className={styles.headerTitleWrap}>
          <h3 className={styles.commentsTitle}>Comments</h3>
          <span className={styles.commentCount}>{comments.length}</span>
        </div>
      </div>

      <div className={styles.composeContainer}>
        <div className={styles.composeHeader}>
          <div className={styles.userProfileGroup}>
            <div className={styles.currentUserAvatar}>OM</div>
            <div className={styles.currentuserInfo}>
              <span className={styles.currentUserName}>Omar Makran</span>
              <span className={styles.currentUserBadge}>Public comment</span>
            </div>
          </div>
        </div>

        <div className={styles.composeCard}>
          <textarea
            ref={textareaRef}
            className={styles.commentInput}
            placeholder="Share your thoughts about this movie..."
            value={inputValue}
            onChange={(e) => handleInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />

          <div className={styles.composeToolbar}>
            <div className={styles.toolbarLeft}>
              <div className={styles.emojiAnchor} ref={emojiRef}>
                <button
                  type="button"
                  onClick={() => setShowEmoji((v) => !v)}
                  className={styles.emojiBtn}
                  aria-label="Add emoji"
                  title="Insert emoji"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                  <span className={styles.emojiBtnLabel}>Emoji</span>
                </button>

                {showEmoji && (
                  <div className={styles.emojiPicker}>
                    {EMOJI_SET.map((emoji) => (
                      <button
                        key={emoji}
                        className={styles.emojiOption}
                        onClick={() => insertEmoji(emoji)}
                        type="button"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.toolbarRight}>
              <button
                className={`${styles.sendBtn} ${canSend ? styles.sendBtnActive : ""}`}
                onClick={handleSend}
                disabled={!canSend}
                aria-label="Send comment"
                type="button"
              >
                <span>Comment</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💬</div>
          <p className={styles.emptyText}>No comments yet</p>
          <p className={styles.emptySubtext}>
            Be the first to share your thoughts
          </p>
        </div>
      ) : (
        <>
          <div
            className={styles.commentsList}
            style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            {visibleComments.map((c: any) => (
              <div
                key={uuidv4()}
                style={{
                  // animationDelay: `${idx * 0.04}s`,
                  display: "flex",
                  columnGap: "10px",
                  alignItems: "center",
                }}
              >
                {/* <div className={styles.commentAvatar}>
                  
                </div> */}
                <div className={styles.commentContent}>
                  <div className={styles.commentHeader}>
                    <div className={styles.commentMeta}>
                      <span className={styles.commentAuthor}>
                        {c.user_name}
                      </span>
                      {/* {c.isOwn && <span className={styles.ownBadge}>You</span>} */}
                      <span className={styles.commentDot}>·</span>
                      {/* <span className={styles.commentTime}>{c.time}</span> */}
                    </div>

                    {/* <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(c.id)}
                      aria-label="Delete comment"
                      title="Delete comment"
                      type="button"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button> */}
                  </div>
                  <p className={styles.commentText}>{c.comments}</p>
                </div>
              </div>
            ))}
          </div>

          {!showAll && hiddenCount > 0 && (
            <button
              className={styles.viewMoreBtn}
              onClick={() => setShowAll(true)}
              type="button"
            >
              <span>
                View {hiddenCount} more comment{hiddenCount > 1 ? "s" : ""}
              </span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}

          {showAll && comments.length > INITIAL_SHOW && (
            <button
              className={styles.viewMoreBtn}
              onClick={() => setShowAll(false)}
              type="button"
            >
              <span>Show less</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CommentsSection;
