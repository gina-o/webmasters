import React, { useState, useEffect } from "react";
import { auth, db, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, collectionGroup, query, orderBy, onSnapshot } from "firebase/firestore";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const Social = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const postsCollection = collection(db, "posts");
    const postsQuery = query(postsCollection, orderBy("timestamp", "desc"));

    const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const commentsCollection = collectionGroup(db, "comments");
    const unsubscribeComments = onSnapshot(commentsCollection, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        postId: doc.ref.parent.parent.id,
      })));
    });

    return () => {
      unsubscribePosts();
      unsubscribeComments();
    };
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  if (!authChecked) {
    return <div className="text-center text-white text-xl">Loading...</div>;
  }

const filteredPosts = posts
  .filter((post) => {
    const term = searchTerm.toLowerCase();
    return (
      post.title?.toLowerCase().includes(term) ||
      post.text?.toLowerCase().includes(term)
    );
  })
  .sort((a, b) => {
    const term = searchTerm.toLowerCase();

    // Score each post
    const score = (post) => {
      if (!term) return 0; // no search term, keep original order
      const title = post.title?.toLowerCase() || "";
      const text = post.text?.toLowerCase() || "";

      if (title === term) return 3; // exact title match → highest priority
      if (title.includes(term)) return 2; // partial title match
      if (text.includes(term)) return 1; // match in text only
      return 0;
    };

    return score(b) - score(a); // higher score comes first
  });



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-300 py-10">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-blue-400">
        <h1 className="text-2xl font-sixtyfour animate-neon-pulse-purple text-center mb-4">
          The Sounds of Houston
        </h1>
        <p className="text-center font-pixel text-black">Let's chat</p>

        {user ? (
          <>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-medium font-pixel">Welcome, {user.displayName}!</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Log Out
              </button>
            </div>

            {/* ✅ Search bar */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <PostForm />
            <PostList posts={filteredPosts} comments={comments} />
          </>
        ) : (
          <div className="text-center mt-4">
            <p>Please log in to view posts.</p>
            <button
              onClick={handleLogin}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Log in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Social;
