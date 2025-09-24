import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogTableItem from "./BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Dashboard() {
  const { axios } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex-1 p-4 md:p-10 bg-green-50/40 min-h-screen">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Blogs", value: dashboardData.blogs },
          { label: "Comments", value: dashboardData.comments },
          { label: "Drafts", value: dashboardData.drafts },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-green-600 font-bold text-xl">
                {item.value}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{item.value}</h2>
              <p className="text-gray-600 font-medium">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Latest Blogs */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Latest Blogs
      </h3>
      <div className="relative max-w-4xl overflow-x-auto shadow-md rounded-xl bg-white">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs uppercase bg-green-100/60 text-gray-700">
            <tr>
              <th className="px-2 py-4 xl:px-6">#</th>
              <th className="px-2 py-4">Blog Title</th>
              <th className="px-2 py-4 max-sm:hidden">Date</th>
              <th className="px-2 py-4 max-sm:hidden">Status</th>
              <th className="px-2 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentBlogs.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                index={index + 1}
                onPublish={() => {}}
                onDelete={() => {}}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
