import React, { useState, useEffect, useRef } from "react";
import { auth, db, googleProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, collectionGroup, query, orderBy, onSnapshot } from "firebase/firestore";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const Social = () => {
    const socialRef = useRef(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
    const scroll = () => {
        socialRef.current?.scrollIntoView({ behavior: "smooth" });
      };

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
    <div className="min-h-screen bg-[url('/houmenu.png')] py-10 bg-cover">
        <section className="relative h-screen flex items-center justify-center">


          <div className="relative z-10 max-w-5xl w-full bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-xl border border-white/20 text-center">
            <h1 className="text-4xl mb-4 text-white font-rubik-80s">
              Communicate with Others
            </h1>

            <p className="text-lg max-w-2xl mx-auto">
              See what others are saying...
            </p>

            <button
              onClick={scroll}
              className="mt-4 bg-[#92BCCF] hover:bg-cyan-700 py-2 px-4 rounded-lg"
            >
              Chat!
            </button>
          </div>
        </section>
      <div className="content">
          <section ref={socialRef} className="relative min-h-screen flex items-start justify-center pt-40">
      <div className="w-[90%] mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-blue-400">


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
      </section>
    </div>
    </div>
  );
};

export default Social;
