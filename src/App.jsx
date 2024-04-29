import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login";
import Notification from "./components/notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/lib/firebase";
import { userStore } from "./components/lib/userStore";
import { chatStore } from "./components/lib/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = userStore();
  const { chatId } = chatStore();

  useEffect(() => {
    const onSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      onSub();
    };
  }, [fetchUserInfo]);
  if (isLoading) return <div className="loading">Loading....</div>;
  return (
    <div className="container">
      {currentUser ? (
        <>
          {" "}
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
