import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ProfileButton = ({ onClick }) => {
  const { user } = useContext(UserContext);

  // Normalize user fields (handles both normal login and Google login)
  const avatar =
    user?.user?.avatar || user?.avatar ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  // Get user's name (handles both normal login and Google login)
  const name = user?.user?.name || user?.name || null;

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
      <p className="hidden sm:block">{name ? `Hi ${name}` : "Welcome"}</p>
    </button>
  );
};

export default ProfileButton;
