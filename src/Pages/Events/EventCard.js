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
  Users,
  Bookmark,
  Share2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const EventCard = ({ event }) => {
  // Array of icons to choose from
  const icons = [
    <Star size={20} className="text-yellow-500" />,
    <Heart size={20} className="text-red-500" />,
    <Zap size={20} className="text-purple-500" />,
    <BookOpen size={20} className="text-indigo-500" />,
    <Gift size={20} className="text-pink-500" />,
  ];

  // Pick a random icon each render
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  // Calculate percentage of spots filled - safe calculation
  const capacityPercentage = event?.maxAttendees && event?.attendees 
    ? Math.round((event.attendees / event.maxAttendees) * 100) 
    : 0;

  // Get capacity status
  const getCapacityStatus = () => {
    if (capacityPercentage >= 95) return { text: "Almost Full", color: "text-red-600 bg-red-50" };
    if (capacityPercentage >= 80) return { text: "Filling Fast", color: "text-orange-600 bg-orange-50" };
    if (capacityPercentage >= 50) return { text: "Good Availability", color: "text-green-600 bg-green-50" };
    return { text: "Plenty of Spots", color: "text-blue-600 bg-blue-50" };
  };

  const capacityStatus = getCapacityStatus();

  return (
    <motion.div
      className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col relative"
      whileHover={{ y: -6, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Quick Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
          title="Bookmark event"
        >
          <Bookmark size={16} className="text-gray-600 hover:text-indigo-600" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
          title="Share event"
        >
          <Share2 size={16} className="text-gray-600 hover:text-indigo-600" />
        </motion.button>
      </div>

      {/* Enhanced Header */}
      <div className="flex items-center px-6 py-4 gap-4 bg-gradient-to-r from-indigo-50 via-white to-purple-50 border-b border-gray-100">
        <motion.div 
          className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-sm"
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {randomIcon}
        </motion.div>
        <div className="flex-1">
          <h3 className="text-gray-800 font-bold text-lg truncate group-hover:text-indigo-700 transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-gray-500 capitalize">{event.type}</p>
        </div>
        <div className="ml-auto">
          {event.status === "upcoming" && (
            <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium rounded-full shadow-md">
              Upcoming
            </span>
          )}
        </div>
      </div>

      {/* Enhanced Event Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
        
        {/* Capacity Bar */}
        {event.maxAttendees && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {event.attendees}/{event.maxAttendees} attendees
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${capacityStatus.color}`}>
                  {capacityStatus.text}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${capacityPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {event.description}
        </p>
      </div>

      {/* Tags Section */}
      {event.tags && event.tags.length > 0 && (
        <div className="px-6 py-3 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-400 text-xs rounded-md">
                +{event.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Info Section */}
      <div className="px-6 py-4 grid grid-cols-2 gap-4 text-gray-700 text-sm">
        <motion.div 
          className="flex items-center gap-3 group/item"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="p-2 bg-pink-50 rounded-lg group-hover/item:bg-pink-100 transition-colors">
            <MapPin size={16} className="text-pink-500" />
          </div>
          <span className="truncate font-medium">{event.location}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-3 group/item"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="p-2 bg-blue-50 rounded-lg group-hover/item:bg-blue-100 transition-colors">
            <Clock size={16} className="text-blue-500" />
          </div>
          <span className="font-medium">{event.time}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-3 group/item"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="p-2 bg-indigo-50 rounded-lg group-hover/item:bg-indigo-100 transition-colors">
            <Calendar size={16} className="text-indigo-500" />
          </div>
          <span className="font-medium">
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-3 group/item"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="p-2 bg-purple-50 rounded-lg group-hover/item:bg-purple-100 transition-colors">
            <Users size={16} className="text-purple-500" />
          </div>
          <span className="font-medium">{event.attendees} joined</span>
        </motion.div>
      </div>

      {/* Enhanced CTA Buttons */}
      <div className="px-6 py-4 mt-auto">
        <div className="flex gap-3">
          <Link
            to={`/events/${event.id}`}
            className="flex-1 group/cta relative overflow-hidden"
          >
            <motion.div
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Register Now</span>
              <ChevronRight size={16} className="transition-transform group-hover/cta:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover/cta:opacity-100 transition-opacity rounded-xl" />
            </motion.div>
          </Link>
          
          <Link
            to={`/events/${event.id}`}
            className="group/details"
          >
            <motion.div
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 text-gray-700 px-4 py-3 text-sm font-semibold hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={16} className="transition-transform group-hover/details:rotate-12" />
              <span>Details</span>
            </motion.div>
          </Link>
        </div>
        
        {/* Additional Info for Past Events */}
        {event.status === "past" && (
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Event completed with {event.attendees} participants
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;
