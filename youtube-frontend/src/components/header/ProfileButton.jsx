import { Link } from "react-router-dom";

const ProfileButton = ({ onClick }) => {
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  // Normalize user fields (handles both normal login and Google login)
  const avatar =
    parsedUser?.user?.avatar || parsedUser?.avatar ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const name = parsedUser?.user?.name || parsedUser?.name || null;

  return (
    <button
      className="p-1 rounded-full hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={avatar}
        alt="Profile"
        className="h-8 w-8 rounded-full object-cover"
      />
      <p>{name ? `Hi ${name}` : "Welcome"}</p>
    </button>
  );
};

export default ProfileButton;
