import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  doc,
  deleteDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const ReplyList = ({ postId }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const commentsCollection = collection(db, "posts", postId, "comments");
    const q = query(commentsCollection, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReplies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReplies(fetchedReplies);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleDeleteReply = async (replyId) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      try {
        await deleteDoc(doc(db, "posts", postId, "comments", replyId));
        alert("Reply deleted!");
      } catch (error) {
        console.error("Error deleting reply:", error.message);
      }
    }
  };

  return (
    <div className="mt-4">
      {replies.length === 0 ? (
        <p className="text-center text-gray-600">
          No comments yet. Be the first to reply!
        </p>
      ) : (
        replies.map((reply) => (
          <div
            key={reply.id}
            className="flex flex-col mb-4 p-4 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-start gap-3">
              <img
                src={
                  reply.userPhoto ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    reply.userName || "Anonymous"
                  )}&background=random`
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-sm">
                  {reply.userName || "Anonymous"}
                </p>
                <p className="text-gray-800">{reply.text}</p>
              </div>
            </div>

            {auth.currentUser?.uid === reply.userId && (
              <button
                onClick={() => handleDeleteReply(reply.id)}
                className="mt-2 self-end bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReplyList;
