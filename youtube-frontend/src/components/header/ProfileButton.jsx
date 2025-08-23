const ProfileButton = ({onClick}) => {
  return (
    <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClick}>
      <img
        src="/images/profile.jpg"
        alt="Profile"
        className="h-8 w-8 rounded-full object-cover"
      />
    </button>
  );
};

export default ProfileButton;
