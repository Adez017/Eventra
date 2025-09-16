import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
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
  Users,
  ExternalLink,
} from "lucide-react";

const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Array of icons to choose from
  const icons = [
    <Star size={20} className="text-yellow-500" />,
    <Heart size={20} className="text-red-500" />,
    <Zap size={20} className="text-purple-500" />,
    <BookOpen size={20} className="text-indigo-500" />,
    <Gift size={20} className="text-pink-500" />,
  ];

  // Pick a consistent icon based on event ID to avoid random changes
  const iconIndex = event.id ? (event.id - 1) % icons.length : 0;
  const eventIcon = icons[iconIndex];

  // Calculate attendance percentage
  const attendancePercentage = event.attendees && event.maxAttendees 
    ? (event.attendees / event.maxAttendees) * 100 
    : 0;

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-green-500 text-white';
      case 'past': return 'bg-gray-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex flex-col"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Enhanced shadow and glow effect */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        animate={{
          opacity: isHovered ? 0.2 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* --- Enhanced Header --- */}
        <motion.div 
          className="flex items-center px-6 py-4 gap-4 bg-gradient-to-r from-indigo-50 via-white to-purple-50 border-b"
          animate={{
            background: isHovered 
              ? "linear-gradient(to right, rgb(238 242 255), rgb(255 255 255), rgb(250 245 255))"
              : "linear-gradient(to right, rgb(238 242 255), rgb(255 255 255), rgb(250 245 255))"
          }}
        >
          <motion.div 
            className="p-2 bg-white rounded-lg shadow-sm"
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: 1.1,
              transition: { duration: 0.6 }
            }}
          >
            {eventIcon}
          </motion.div>
          <h3 className="text-gray-800 font-semibold text-lg truncate flex-grow">
            {event.title}
          </h3>
          <motion.div 
            className="ml-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {event.status && (
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(event.status)}`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* --- Enhanced Event Image --- */}
        <div className="relative h-56 overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: imageLoaded ? 1 : 1.1, 
              opacity: imageLoaded ? 1 : 0 
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.7, ease: "easeOut" }
            }}
          />
          
          {/* Enhanced gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
            animate={{
              background: isHovered 
                ? "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.1), transparent)"
                : "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.05), transparent)"
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Attendance indicator overlay */}
          {event.attendees && event.maxAttendees && (
            <motion.div 
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-sm">
                <Users size={14} className="text-indigo-600" />
                <span className="font-medium text-gray-700">
                  {event.attendees}/{event.maxAttendees}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* --- Enhanced Description --- */}
        <motion.div 
          className="px-6 py-4 border-b flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {event.description}
          </p>
        </motion.div>

        {/* --- Attendance Progress Bar --- */}
        {event.attendees && event.maxAttendees && (
          <motion.div 
            className="px-6 py-3 border-b bg-gray-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600">Attendance</span>
              <span className="text-xs font-semibold text-indigo-600">
                {Math.round(attendancePercentage)}% Full
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${attendancePercentage}%` }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* --- Enhanced Info Section --- */}
        <motion.div 
          className="px-6 py-4 grid grid-cols-2 gap-4 text-gray-700 text-sm bg-gray-50/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <motion.div 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <MapPin size={16} className="text-pink-500 flex-shrink-0" />
            <span className="truncate font-medium">{event.location}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <Clock size={16} className="text-blue-500 flex-shrink-0" />
            <span className="font-medium">{event.time}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <Tag size={16} className="text-purple-500 flex-shrink-0" />
            <span className="font-medium capitalize">{event.type}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <Calendar size={16} className="text-indigo-500 flex-shrink-0" />
            <span className="font-medium">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
          </motion.div>
        </motion.div>

        {/* --- Enhanced CTA Buttons --- */}
        <motion.div 
          className="px-6 py-4 flex gap-3 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div className="flex-1">
            <Link
              to={`/events/${event.id}`}
              className="group relative w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 text-sm font-semibold shadow-lg overflow-hidden transition-all duration-300"
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Button content */}
              <span className="relative z-10 transition-transform duration-200 group-hover:scale-105">
                Register Now
              </span>
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full scale-0"
                whileTap={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
          </motion.div>
          
          <motion.div className="flex-1">
            <Link
              to={`/events/${event.id}`}
              className="group relative w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 text-gray-700 px-4 py-3 text-sm font-semibold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 overflow-hidden"
            >
              {/* Button content */}
              <span className="relative z-10 transition-transform duration-200 group-hover:scale-105">
                View Details
              </span>
              <motion.div
                className="relative z-10"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink size={16} />
              </motion.div>
              
              {/* Hover background */}
              <motion.div
                className="absolute inset-0 bg-indigo-50"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-indigo-200 rounded-full scale-0"
                whileTap={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventCard;
