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

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col group"
      whileHover={{ y: -6, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* --- Header --- */}
      <div className="flex items-center px-6 py-4 gap-4 bg-gradient-to-r from-indigo-50 dark:from-gray-700 to-white dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <motion.div 
          className="p-2 bg-indigo-100 dark:bg-gray-600 rounded-lg"
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {randomIcon}
        </motion.div>
        <h3 className="text-gray-800 dark:text-gray-100 font-semibold text-lg truncate">
          {event.title}
        </h3>
        <div className="ml-auto">
          {event.status === "upcoming" && (
            <motion.span 
              className="text-xs px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
            >
              Upcoming
            </motion.span>
          )}
        </div>
      </div>

      {/* --- Event Image --- */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
        
        {/* Subtle shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] skew-x-12"
          animate={{
            translateX: ["translate-x-[-100%]", "translate-x-[100%]"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* --- Description --- */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {event.description}
        </motion.p>
      </div>

      {/* --- Info Section --- */}
      <div className="px-6 py-4 grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-sm">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <MapPin size={16} className="text-pink-500" />
          <span className="truncate">{event.location}</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Clock size={16} className="text-blue-500" />
          <span>{event.time}</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Tag size={16} className="text-purple-500" />
          <span>{event.type}</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Calendar size={16} className="text-indigo-500" />
          <span>
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </span>
        </motion.div>
      </div>

      {/* --- CTA Buttons --- */}
      <div className="px-6 py-4 flex gap-3">
        <motion.div
          className="flex-1"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={`/events/${event.id}`}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-sm font-medium shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
          >
            Register Now
          </Link>
        </motion.div>
        <motion.div
          className="flex-1"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={`/events/${event.id}`}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
          >
            View Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Demo component to show the enhanced cards
const EventCardDemo = () => {
  const sampleEvents = [
    {
      id: 1,
      title: "React Advanced Workshop",
      description: "Deep dive into advanced React patterns, hooks, and performance optimization techniques. Learn how to build scalable applications with best practices.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
      location: "Tech Hub, Silicon Valley",
      time: "10:00 AM - 4:00 PM",
      date: "2025-09-25",
      type: "Workshop",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Design Systems Conference",
      description: "Explore the future of design systems and component libraries in modern web development.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
      location: "Design Center, NYC",
      time: "9:00 AM - 6:00 PM",
      date: "2025-10-15",
      type: "Conference",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Startup Networking Mixer",
      description: "Connect with fellow entrepreneurs, investors, and innovators in the startup ecosystem.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500",
      location: "Innovation District",
      time: "6:00 PM - 9:00 PM",
      date: "2025-10-01",
      type: "Networking",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Enhanced Event Cards
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Same functionality, enhanced UI animations and interactions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sampleEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCardDemo;