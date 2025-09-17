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
        className="flex items-center gap-1 lg:ml-8 px-3 py-1 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
        onClick={handleButtonClick}
      >
        {channel ? (
          <span className="text-xs font-medium">My Channel</span>
        ) : (
          <>
            <span className="text-lg font-bold">+</span>
            <span className="text-sm font-medium">Create</span>
          </>
        )}
      </button>
    )
  );
}
