import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Heart, Sparkles, Send, ShieldAlert, CheckCircle, User, Loader2 } from "lucide-react";
import { 
  db, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  increment,
  serverTimestamp 
} from "../lib/firebase";
import { GuestbookComment } from "../types";

const SEED_COMMENTS: GuestbookComment[] = [
  {
    id: "seed-1",
    name: "Aarav Malhotra",
    content: "Absolutely phenomenal work on the summer luxury campaign. The professionalism and energy Ankita brought to the set was unparalleled. Highly recommended for premium editorial shoots!",
    role: "Photographer",
    likes: 24,
    createdAt: { seconds: 1782651600 } // June 2026
  },
  {
    id: "seed-2",
    name: "Elena Rostova",
    content: "Ankita's poise and elegant posture made our luxury bridal launch a complete triumph. She knows exactly how to work with premium silks and haute couture drapes.",
    role: "Designer",
    likes: 18,
    createdAt: { seconds: 1782997200 } // July 2026
  },
  {
    id: "seed-3",
    name: "Devika Sen",
    content: "I've worked with Ankita on multiple lifestyle campaigns. Her range—from traditional ethnic wear to modern streetwear—is incredible. Always punctual and extremely collaborative.",
    role: "Stylist",
    likes: 15,
    createdAt: { seconds: 1783429200 } // July 2026
  }
];

export default function CommentBook() {
  const [comments, setComments] = useState<GuestbookComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [likedComments, setLikedComments] = useState<string[]>([]);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<GuestbookComment["role"]>("Photographer");
  const [content, setContent] = useState("");

  // Track Firestore snapshot listener
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedComments: GuestbookComment[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            fetchedComments.push({
              id: doc.id,
              name: data.name || "Anonymous",
              email: data.email || "",
              content: data.content || "",
              role: (data.role as GuestbookComment["role"]) || "Other",
              createdAt: data.createdAt || null,
              likes: data.likes || 0,
            });
          });
          setComments(fetchedComments);
          setLoading(false);
        },
        (err) => {
          console.error("Firestore snapshot error:", err);
          setError("Failed to stream real-time updates. Showing offline comments.");
          setComments([]);
          setLoading(false);
        }
      );
    } catch (e) {
      console.error("Firebase subscription error:", e);
      setLoading(false);
    }

    // Load liked comments from localStorage
    try {
      const stored = localStorage.getItem("ankita_portfolio_liked_comments");
      if (stored) {
        setLikedComments(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError("Please fill in both name and comment fields.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await addDoc(collection(db, "comments"), {
        name: name.trim(),
        email: email.trim() || null,
        role,
        content: content.trim(),
        likes: 0,
        createdAt: serverTimestamp(),
      });

      setName("");
      setEmail("");
      setContent("");
      setRole("Photographer");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error("Error adding comment to Firestore:", err);
      setError(`Failed to submit comment: ${err.message || err.toString()}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId: string, isSeed: boolean) => {
    if (likedComments.includes(commentId)) return;

    // Save locally
    const newLikes = [...likedComments, commentId];
    setLikedComments(newLikes);
    try {
      localStorage.setItem("ankita_portfolio_liked_comments", JSON.stringify(newLikes));
    } catch (e) {
      console.error(e);
    }

    if (isSeed) {
      // For seed comments, simulate the upvote locally since they aren't stored in DB
      setComments(prev => 
        prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c)
      );
    } else {
      try {
        const commentRef = doc(db, "comments", commentId);
        await updateDoc(commentRef, {
          likes: increment(1)
        });
      } catch (err) {
        console.error("Error incrementing likes in Firestore:", err);
      }
    }
  };

  // Combine fetched comments with seed comments to display
  // We want to make sure the UI is never empty
  const displayComments = [...comments];
  
  // If we have no firebase comments, we show all seed comments
  // If we have some, we append seed comments at the bottom so it remains rich
  const seedToInject = SEED_COMMENTS.filter(
    (seed) => !comments.some((c) => c.name === seed.name && c.content === seed.content)
  );
  
  // Combine real database comments with seed comments
  const finalComments = [...displayComments, ...seedToInject];

  // Helper to format timestamps
  const formatCommentDate = (createdAt: any) => {
    if (!createdAt) return "Just now";
    
    let date: Date;
    if (createdAt.seconds) {
      date = new Date(createdAt.seconds * 1000);
    } else if (createdAt instanceof Date) {
      date = createdAt;
    } else if (typeof createdAt === "number") {
      date = new Date(createdAt);
    } else {
      return "Recently";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Roles map for badges
  const roleColors: Record<GuestbookComment["role"], { bg: string; text: string; border: string }> = {
    Photographer: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    Designer: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    Agency: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
    Fan: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
    Stylist: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    Other: { bg: "bg-stone-500/10", text: "text-stone-400", border: "border-stone-500/20" },
  };

  return (
    <section id="guestbook" className="py-24 bg-stone-900 text-stone-100 border-t border-stone-800 relative overflow-hidden">
      {/* Decorative Editorial Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 border border-stone-700/60 rounded-full mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-stone-300">Interact & Co-create</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-white uppercase mb-4">
            Editorial Guestbook
          </h2>
          <p className="font-sans text-xs text-stone-400 leading-relaxed max-w-lg mx-auto">
            Leave your feedback, reviews, campaign memories, or well-wishes for Ankita and her modeling management. We review all submissions daily.
          </p>
        </div>

        {/* Guestbook Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Write a comment column (LHS) */}
          <div className="lg:col-span-5 bg-stone-950/40 border border-stone-800/80 p-6 md:p-8 rounded-none shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-stone-800/60">
              <Sparkles className="w-4 h-4 text-stone-300" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-stone-200">
                Write in the Book
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="gb-name" className="block font-mono text-[9px] uppercase tracking-wider text-stone-400 mb-1.5">
                  Your Name / Agency <span className="text-stone-500">*</span>
                </label>
                <input
                  id="gb-name"
                  type="text"
                  required
                  placeholder="e.g., Sarah Jenkins / Elite Models"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-stone-500 transition-colors duration-300 rounded-none font-sans"
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="gb-email" className="block font-mono text-[9px] uppercase tracking-wider text-stone-400 mb-1.5">
                  Your Email <span className="text-stone-600">(Optional - kept private)</span>
                </label>
                <input
                  id="gb-email"
                  type="email"
                  placeholder="e.g., sarah@elitemodels.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-stone-500 transition-colors duration-300 rounded-none font-sans"
                />
              </div>

              {/* Role selector */}
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-wider text-stone-400 mb-2">
                  Your Role / Association <span className="text-stone-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Photographer", "Designer", "Agency", "Stylist", "Fan", "Other"] as GuestbookComment["role"][]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 text-[10px] font-mono tracking-wider uppercase transition-all duration-300 border ${
                        role === r
                          ? "bg-stone-100 text-stone-950 border-stone-100"
                          : "bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Field */}
              <div>
                <label htmlFor="gb-content" className="block font-mono text-[9px] uppercase tracking-wider text-stone-400 mb-1.5">
                  Your Message <span className="text-stone-500">*</span>
                </label>
                <textarea
                  id="gb-content"
                  required
                  rows={4}
                  placeholder="Write a testimonial, campaign experience, or supportive message..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={1000}
                  className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-stone-500 transition-colors duration-300 rounded-none font-sans resize-none leading-relaxed"
                />
              </div>

              {/* Error and Success Notifications */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 p-3 text-rose-400 text-xs"
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 p-3 text-emerald-400 text-xs"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Thank you! Your entry has been recorded in the Guestbook.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-stone-100 text-stone-950 font-mono text-[10px] uppercase tracking-widest py-3.5 hover:bg-stone-200 disabled:bg-stone-800 disabled:text-stone-600 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer font-bold"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" /> Sign Guestbook
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Comments Feed column (RHS) */}
          <div className="lg:col-span-7 space-y-6 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800/60 sticky top-0 bg-stone-900 z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-stone-300">Entries</span>
                <span className="bg-stone-800 text-[10px] font-mono px-2 py-0.5 text-stone-400 border border-stone-700/60 font-bold">
                  {finalComments.length}
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500">Real-time Stream Enabled</span>
            </div>

            {loading ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-stone-500 animate-spin" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Loading guestbook entries...</p>
              </div>
            ) : finalComments.length === 0 ? (
              <div className="py-16 text-center text-stone-500 border border-stone-800/40 bg-stone-950/10">
                <p className="font-serif italic text-sm mb-1">Guestbook is currently pristine.</p>
                <p className="font-mono text-[9px] uppercase tracking-widest">Be the very first to sign!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {finalComments.map((comment, index) => {
                    const isLiked = likedComments.includes(comment.id);
                    const isSeed = comment.id.startsWith("seed-");
                    const roleStyle = roleColors[comment.role] || roleColors.Other;
                    
                    return (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.05, 0.3) }}
                        className="bg-stone-950/25 border border-stone-800/40 hover:border-stone-800 p-5 transition-colors duration-300 group relative"
                      >
                        {/* Quote header */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-serif text-sm font-medium text-white tracking-wide">
                                {comment.name}
                              </span>
                              
                              {/* Role Badge */}
                              <span className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider border rounded-full ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                                {comment.role}
                              </span>
                            </div>
                            <span className="font-mono text-[9px] text-stone-500 block mt-0.5">
                              {formatCommentDate(comment.createdAt)}
                            </span>
                          </div>

                          {/* Appreciate / Like Button */}
                          <button
                            onClick={() => handleLike(comment.id, isSeed)}
                            disabled={isLiked}
                            className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono tracking-wider border transition-all duration-300 ${
                              isLiked
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                : "bg-stone-900/40 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200"
                            }`}
                            aria-label="Appreciate entry"
                          >
                            <Heart className={`w-3 h-3 ${isLiked ? "fill-rose-400 text-rose-400 animate-ping-once" : "text-stone-500"}`} />
                            <span>{comment.likes}</span>
                          </button>
                        </div>

                        {/* Content text */}
                        <p className="font-sans text-[12px] leading-relaxed text-stone-300 italic">
                          "{comment.content}"
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
