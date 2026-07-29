import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    user && (
      <div className="flex items-center gap-3">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={`${user.name || "User"} profile`}
            className="h-12 w-12 rounded-full object-cover bg-gray-200"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-600">
            {initial}
          </div>
        )}
        <div>
          <div className="text-[15px] font-bold leading-tight">
            {user.name || ""}
          </div>
          <button
            className="text-purple-500 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
