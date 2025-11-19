import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div className="z-50">
      ChatPage
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default ChatPage;
