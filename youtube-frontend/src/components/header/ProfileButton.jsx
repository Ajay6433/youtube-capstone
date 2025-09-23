import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const ProfileButton = ({ onClick }) => {
  const { user } = useContext(UserContext);
  const [imgError, setImgError] = useState(false);

  // Normalize avatar (handles both normal login and Google login)
  const avatar =
    !imgError
      ? user?.user?.avatar || user?.avatar
      : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  // Normalize name
  const name = user?.user?.name || user?.name || null;

  if (!user) return null; // Don't render if no user context yet

  return (
    <button
      className="p-1 rounded-full hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={avatar}
        alt="Profile"
        className="h-8 w-8 rounded-full object-cover"
        onError={() => setImgError(true)} // fallback if broken image
      />
      <p className="hidden sm:block">{name ? `Hi ${name}` : "Welcome"}</p>
    </button>
  );
};

export default ProfileButton;
