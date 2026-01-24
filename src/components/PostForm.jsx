import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);

  const user = auth.currentUser;
  const userPhoto = user?.photoURL;
  const userName = user?.displayName || "Anonymous";
  const userEmail = user?.email || "User";

  const handlePost = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to post!");
      return;
    }

    if (!title.trim() || !text.trim()) {
      alert("Title and post content cannot be empty!");
      return;
    }

    try {
      setUploading(true);

      const { uid, email, displayName, photoURL } = auth.currentUser;

      await addDoc(collection(db, "posts"), {
        title,
        text,
        userId: uid,
        userEmail: email,
        userName: displayName || "Anonymous",
        userPhoto: photoURL,
        timestamp: serverTimestamp(),
        replies: [],
        likes: 0
      });
      alert("Posted!");
      setTitle("");
      setText("");
    } catch (error) {
      console.error("Error adding post:", error.message);
      alert("Error posting. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-6 bg-white border border-gray-200 shadow rounded-lg p-4">
      <div className="flex items-start gap-3">
        <img
          src={
            userPhoto ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName || userEmail
            )}&background=random`
          }
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />

        <div className="flex flex-col w-full gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            rows={4}
          />
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button
          onClick={handlePost}
          disabled={uploading}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          {uploading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostForm;


