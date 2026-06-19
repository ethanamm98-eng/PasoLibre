"use client";
import { useState, useEffect } from "react";
import { LuMessageCircle, LuCheck, LuX } from "react-icons/lu";

// -------------------- Dummy Comments --------------------
const dummyComments = [
  {
    id: "c1",
    name: "Alice Rivera",
    message: "This resource was super helpful, thank you!",
    rating: 5,
    timestamp: new Date(),
    status: "pending",
  },
  {
    id: "c2",
    name: "Juan Pérez",
    message: "I had some trouble navigating the site.",
    rating: 3,
    timestamp: new Date(),
    status: "pending",
  },
  {
    id: "c3",
    name: "Maria Lopez",
    message: "Excellent guidance on name changes!",
    rating: 4,
    timestamp: new Date(),
    status: "approved",
  },
];

export default function ManageCommunityCommentsCMS() {
  const [comments, setComments] = useState(dummyComments);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ---------------- ESC to Close ----------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ---------------- Approve / Disapprove ----------------
  const approveComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c))
    );
  };

  const disapproveComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "disapproved" } : c))
    );
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  // ---------------- Add New Comment ----------------
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const handleAddComment = () => {
    if (!name || !message) return;

    setComments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        message,
        rating,
        timestamp: new Date(),
        status: "pending",
      },
    ]);

    setName("");
    setMessage("");
    setRating(5);
    setIsDrawerOpen(false);
  };

  return (
    <div className="relative max-w-6xl mx-auto py-20 space-y-16 px-6">
      <h1 className="text-3xl font-semibold text-[#0d4db0]">
        Community Comments Regulation
      </h1>

      {/* Open Drawer Button */}
      {/* <button
        onClick={() => setIsDrawerOpen(true)}
        className="px-6 py-3 bg-[#0d4db0] text-white rounded-xl hover:opacity-90 transition"
      >
        + Add Comment
      </button> */}

      {/* ---------------- Existing Comments ---------------- */}
      <section className="mt-10 space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-6 rounded-2xl border shadow-sm flex justify-between items-start ${
              comment.status === "pending"
                ? "border-yellow-200 bg-yellow-50"
                : comment.status === "approved"
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }`}
          >
            <div>
              <strong className="text-[#0d4db0]">{comment.name}</strong>
              <p className="text-xs text-slate-400">
                {comment.timestamp.toLocaleString()}
              </p>
              <p className="text-sm text-slate-600 mt-2">{comment.message}</p>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <LuMessageCircle
                    key={star}
                    className={`w-4 h-4 ${
                      star <= comment.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 ml-4">
              {comment.status === "pending" && (
                <>
                  <button
                    onClick={() => approveComment(comment.id)}
                    className="text-green-600 flex items-center gap-1"
                  >
                    <LuCheck /> Approve
                  </button>
                  <button
                    onClick={() => disapproveComment(comment.id)}
                    className="text-red-600 flex items-center gap-1"
                  >
                    <LuX /> Disapprove
                  </button>
                </>
              )}
              <button
                onClick={() => deleteComment(comment.id)}
                className="text-slate-500 text-sm underline mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------- Backdrop ---------------- */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* ---------------- Add Comment Drawer ---------------- */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 space-y-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#0d4db0]">
              Add Comment
            </h2>
            <button onClick={() => setIsDrawerOpen(false)}>✕</button>
          </div>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-3 rounded-xl"
            rows={4}
          />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border p-3 rounded-xl"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddComment}
            disabled={!name || !message}
            className="w-full bg-[#0d4db0] text-white py-3 rounded-xl disabled:opacity-40"
          >
            Save Comment
          </button>
        </div>
      </div>
    </div>
  );
}
