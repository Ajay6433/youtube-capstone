const ProfileButton = () => {
  return (
    <button className="p-1 rounded-full hover:bg-gray-100">
      <img
        src="/images/profile.jpg"
        alt="Profile"
        className="h-8 w-8 rounded-full object-cover"
      />
    </button>
  );
};

export default ProfileButton;
