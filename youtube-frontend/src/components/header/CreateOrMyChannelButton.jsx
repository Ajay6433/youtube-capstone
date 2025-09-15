import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrMyChannelButton({ user, setShowChannelModal }) {
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);

  // ✅ Load channel from localStorage on mount
  useEffect(() => {
    const storedChannel = localStorage.getItem("channel");
    if (storedChannel) {
      setChannel(JSON.parse(storedChannel)); // store channel object in state
    }
  }, []);

  const handleButtonClick = () => {
    if (channel) {
      // ✅ Navigate to channel page
      navigate(`/channel/${channel._id}`);
    } else {
      // ✅ Open modal to create channel
      setShowChannelModal(true);
    }
  };

  return (
    user && (
      <button
        className="flex items-center gap-2 lg:ml-8 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        onClick={handleButtonClick}
      >
        {channel ? (
          <>
            <span className="text-black text-xs">My Channel</span>
          </>
        ) : (
          <>
            <span className="text-xl font-bold">+</span>
            <span className="text-black font-medium">Create</span>
          </>
        )}
      </button>
    )
  );
}
