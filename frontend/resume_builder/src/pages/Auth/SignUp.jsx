import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  getPasswordValidationError,
  passwordRequirements,
} from "../../utils/passwordValidation";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = ({ setCurrentPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    const passwordError = getPasswordValidationError(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Upload profile photo first if selected
      let profileImageUrl = "";
      if (profilePhoto?.file) {
        const formData = new FormData();
        formData.append("image", profilePhoto.file);
        const uploadRes = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        profileImageUrl = uploadRes.data.imageUrl;
      }

      // Register user
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white px-6 py-8 sm:px-8">
      <h3 className="text-2xl font-bold text-gray-900">Create your account</h3>
      <p className="mt-2 text-sm text-gray-600">
        Start building your professional resume today.
      </p>

      <form onSubmit={handleSignUp} className="mt-6 space-y-4">
        <ProfilePhotoSelector
          value={profilePhoto?.preview}
          onChange={(file, preview) =>
            setProfilePhoto(file ? { file, preview } : null)
          }
          className="mb-6"
        />

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium text-gray-700">
          Full name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
            className="form-input"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="form-input"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Password
          <span className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              minLength={8}
              autoComplete="new-password"
              className="form-input pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </span>
        </label>

        <ul className="space-y-1 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-600">
          {passwordRequirements.map((requirement) => (
            <li key={requirement.key}>{requirement.label}</li>
          ))}
        </ul>

        <label className="block text-sm font-medium text-gray-700">
          Confirm password
          <span className="relative block">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
              autoComplete="new-password"
              className="form-input pr-10"
            />
            <button
              type="button"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
            >
              {showConfirmPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </span>
        </label>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          className="font-semibold text-purple-600 hover:text-purple-800"
          onClick={() => setCurrentPage("login")}
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default SignUp;
