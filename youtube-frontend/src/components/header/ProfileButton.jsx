import { Link } from "react-router-dom";
const ProfileButton = ({onClick}) => {
  const user = localStorage.getItem("user");
  return (
    <button className="p-1 rounded-full hover:bg-gray-100 flex items-center gap-2 cursor-pointer" onClick={onClick}>
      <img
        src={user ? JSON.parse(user).user.avatar : "/default-avatar.png"}
        alt="Profile"
        className="h-8 w-8 rounded-full object-cover"
      />
      <p>{user ? JSON.parse(user).user.name : "Welcome"}</p>
    </button>
  );
};

export default ProfileButton;
