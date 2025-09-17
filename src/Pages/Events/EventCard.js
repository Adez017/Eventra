import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  Star,
  Heart,
  Zap,
  BookOpen,
  Gift,
} from "lucide-react";

const EventCard = ({ event }) => {
  const [liked, setLiked] = useState(false);

  // Array of icons to choose from
  const icons = [
    <Star size={20} className="text-yellow-500" />,
    <Heart size={20} className="text-red-500" />,
    <Zap size={20} className="text-purple-500" />,
    <BookOpen size={20} className="text-indigo-500" />,
    <Gift size={20} className="text-pink-500" />,
  ];

  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col group"
      whileHover={{ y: -6, rotateY: 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Floating like button */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <Heart
          size={18}
          className={`${
            liked ? "fill-red-500 text-red-500" : "text-gray-500 dark:text-gray-300"
          }`}
        />
      </button>

      {/* --- Header --- */}
      <div className="flex items-center px-6 py-4 gap-4 bg-gradient-to-r from-indigo-50 dark:from-gray-700 to-white dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="p-2 bg-indigo-100 dark:bg-gray-600 rounded-lg">
          {randomIcon}
        </div>
        <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-lg truncate">
          {event.title}
        </h3>
        <div className="ml-auto">
          {event.status === "upcoming" && (
            <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow">
              Upcoming
            </span>
          )}
          {event.status === "past" && (
            <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full shadow">
              Past
            </span>
          )}
          {event.status === "live" && (
            <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full shadow animate-pulse">
              Live 🔴
            </span>
          )}
        </div>
      </div>

      {/* --- Event Image --- */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* --- Description --- */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {event.description}
        </p>
      </div>

      {/* --- Info Section --- */}
      <div className="px-6 py-4 grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-sm backdrop-blur-lg bg-white/30 dark:bg-gray-700/30 rounded-xl m-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-pink-500" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-blue-500" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-purple-500" />
          <span>{event.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-indigo-500" />
          <span>
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>

      {/* --- CTA Buttons --- */}
      <div className="px-6 pb-6 flex gap-3">
        <Link
          to={`/events/${event.id}`}
          className="flex-1 relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-sm font-medium shadow group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"></span>
          Register Now
        </Link>
        <Link
          to={`/events/${event.id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
