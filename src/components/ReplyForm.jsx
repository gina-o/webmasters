import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ReplyForm = ({ postId }) => {
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to comment!");
      return;
    }

    if (!comment.trim()) {
      alert("Reply cannot be empty!");
      return;
    }

    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        text: comment,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userPhoto: user.photoURL || null,
        timestamp: serverTimestamp(),
      });
      setComment("");
      console.log("Reply successfully added to Firestore!");
    } catch (error) {
      console.error("Error commenting:", error.message);
    }
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
      <textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Write a reply..."
        className="w-full p-3 border rounded-lg mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleComment}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
      >
        Post Reply
      </button>
    </div>
  );
};

export default ReplyForm;
