import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// 👉 Base URL ka qaado env
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// ✅ Interceptor hal mar samee (in file-kan la load gareeyo)
axios.interceptors.request.use(
  (config) => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      config.headers.Authorization = `Bearer ${savedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Fetch Blogs (public)
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Init effect
  useEffect(() => {
    fetchBlogs();

    // Check localStorage for token
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook gaar ah
export const useAppContext = () => useContext(AppContext);
