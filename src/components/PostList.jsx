import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingToPostId, setReplyingToPostId] = useState(null);
  const [showOptions, setShowOptions] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const postsRef = collection(db, "posts");
    const orderedPosts = query(postsRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(orderedPosts);
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postsData);
  };

  const refreshPosts = fetchPosts;

  const handleDelete = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
    refreshPosts();
    setShowOptions(null);
  };

  const handleEdit = (postId, currentText) => {
    setEditingPostId(postId);
    setEditedText(currentText);
    setShowOptions(null);
  };

  const handleSave = async (postId) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { text: editedText });
    setEditingPostId(null);
    refreshPosts();
  };

const handleLike = async (postId) => {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    alert("You must be logged in to like posts!");
    return;
  }

  const postRef = doc(db, "posts", postId);
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  const likesArray = post.likes || [];

  if (likesArray.includes(userId)) {
    alert("You've already liked this post.");
    return; // prevent multiple likes
  }

  const updatedLikes = [...likesArray, userId];

  await updateDoc(postRef, {
    likes: updatedLikes,
  });

  refreshPosts();
};


  const handleReply = async (postId) => {
    const postRef = doc(db, "posts", postId);
    const post = posts.find((p) => p.id === postId);
const user = auth.currentUser;
    const newReply = {
      
      userEmail: auth.currentUser?.email,
      userName: user?.displayName || "Anonymous",
      userPhoto: user?.photoURL || null,
      text: replyText,
      timestamp: new Date().toISOString(),
    };

    await updateDoc(postRef, {
      replies: [...(post?.replies || []), newReply],
    });

    setReplyText("");
    setReplyingToPostId(null);
    refreshPosts();
  };

  return (
    <div className="mt-6 space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 bg-white rounded-lg shadow border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={
                post.userPhoto ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  post.userEmail || "User"
                )}&background=random`
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{post.userName || post.userEmail}</p>
            </div>

            {auth.currentUser?.uid === post.userId && (
              <div className="relative ml-auto">
                <button
                  onClick={() =>
                    setShowOptions(showOptions === post.id ? null : post.id)
                  }
                  className="text-gray-500"
                >
                  <span className="text-xl">⋮</span>
                </button>
                {showOptions === post.id && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 p-2 z-10">
                    <button
                      onClick={() => handleEdit(post.id, post.text)}
                      className="w-full text-left text-yellow-600 px-2 py-1 rounded mb-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="w-full text-left text-red-600 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-1">
            {post.title || "Untitled Post"}
          </h2>

          {/* Content or edit box */}
          {editingPostId === post.id ? (
            <>
              <textarea
                className="w-full border rounded p-2 mb-2"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <button
                onClick={() => handleSave(post.id)}
                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditingPostId(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap mb-2">
              {post.text}
            </p>
          )}

          {/* Like + comment count */}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <button
              onClick={() => handleLike(post.id, post.likes || 0)}
              className="text-red-500 hover:underline"
            >
              ❤️ {post.likes ? post.likes.length : 0}
            </button>
            <span className="text-gray-500">
              💬 {post.replies?.length || 0} comment
              {post.replies?.length === 1 ? "" : "s"}
            </span>
          </div>

          {/* Reply button */}
          <div className="mt-2">
            <button
              onClick={() => setReplyingToPostId(post.id)}
              className="text-blue-500 hover:underline text-sm"
            >
              Reply
            </button>
          </div>

          {/* Reply input */}
          {replyingToPostId === post.id && (
            <div className="mt-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full border rounded p-2 mb-2"
                placeholder="Write a reply..."
              />
              <button
                onClick={() => handleReply(post.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Post Reply
              </button>
            </div>
          )}

          {/* Show replies */}
{post.replies &&
  post.replies.map((reply, index) => (
    <div
      key={index}
      className="mt-3 pl-6 border-l-2 border-gray-300"
    >
      <p className="text-sm text-gray-600">
        {reply.userName || "Anonymous"} replied:
      </p>
      <p className="text-gray-700">{reply.text}</p>
    </div>
  ))}

        </div>
      ))}
    </div>
  );
};

export default PostList;
