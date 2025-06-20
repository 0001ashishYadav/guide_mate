"use client";
import { useEffect, useState } from "react";
import { getPlacesFromGemini } from "./utils/getPlacesFromGemini";
import InfoCard from "./components/InfoCard";
import { speak } from "./utils/textToSpeech";
import Footer from "./components/homePage/Footer";
import {
  Clock,
  MapPin,
  Mic,
  MicOff,
  Navigation,
  Search,
  Star,
  TrendingUp,
  Volume2,
} from "lucide-react";
import Header from "./components/homePage/Header";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [query, setQuery] = useState("");

  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Central Park, New York",
    "Eiffel Tower, Paris",
    "Times Square, NYC",
  ]);

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularDestinations = [
    {
      name: "Central Park",
      location: "New York, USA",
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=400",
      visitors: "42M annually",
    },
    {
      name: "Eiffel Tower",
      location: "Paris, France",
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400",
      visitors: "6M annually",
    },
    {
      name: "Tokyo Tower",
      location: "Tokyo, Japan",
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=400",
      visitors: "2.5M annually",
    },
    {
      name: "Sydney Opera House",
      location: "Sydney, Australia",
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg?auto=compress&cs=tinysrgb&w=400",
      visitors: "8M annually",
    },
  ];

  const suggestions = [
    "Restaurants near me",
    "Best coffee shops in downtown",
    "Museums and galleries",
    "Parks and outdoor spaces",
    "Shopping centers nearby",
  ];

  const handleSpeech = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setQuery(text);
      speak(`Searching for ${text}`);

      const results = await getPlacesFromGemini(text);
      console.log(results);

      setPlaces(results);
      speak(`${results.length} places found.`);
    };

    recognition.start();
  };

  const handleVoiceSearch = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      speak("Speech recognition is not supported in this browser.");
      return;
    }

    // Check network connectivity
    if (!navigator.onLine) {
      speak(
        "No internet connection. Speech recognition requires internet access."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    // Configuration
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("🎤 Listening...");
      setIsListening(true);
    };

    recognition.onresult = async (event) => {
      try {
        const text = event.results[0][0].transcript;
        console.log("✅ You said:", text);

        setIsListening(false);
        setQuery(text);
        speak(`Searching for ${text}`);

        const results = await getPlacesFromGemini(text);
        console.log(results);

        setPlaces(results);
        speak(`${results.length} places found.`);
      } catch (error) {
        console.error("Error processing speech result:", error);
        setIsListening(false);
        speak("Sorry, there was an error processing your request.");
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);

      // Handle different types of errors
      switch (event.error) {
        case "network":
          speak(
            "Network error. Please check your internet connection and try again."
          );
          break;
        case "not-allowed":
        case "permission-denied":
          speak(
            "Microphone permission denied. Please allow microphone access."
          );
          break;
        case "no-speech":
          speak("No speech detected. Please try again.");
          break;
        case "audio-capture":
          speak("No microphone found. Please check your microphone.");
          break;
        case "service-not-allowed":
          speak(
            "Speech recognition service not allowed. Please try again later."
          );
          break;
        default:
          speak("Sorry, I couldn't understand that. Please try again.");
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
    };

    // Add timeout to prevent hanging
    const timeout = setTimeout(() => {
      recognition.stop();
      setIsListening(false);
      speak("Speech recognition timed out. Please try again.");
    }, 10000); // 10 second timeout

    recognition.onend = () => {
      clearTimeout(timeout);
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      setIsListening(false);
      speak("Failed to start speech recognition. Please try again.");
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      setRecentSearches((prev) => [
        query,
        ...prev.filter((s) => s !== query).slice(0, 2),
      ]);
      setSearchQuery("");
      setShowSuggestions(false);
      // Here you would integrate with Gemini API for actual search
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        // Simulate voice activity animation
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  return (
    <>
      <Header />

      {/* <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {places.map((place, index) => (
          <InfoCard key={index} place={place} />
        ))}
      </div> */}

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Find Places with
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              Your Voice
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover amazing places around you using the power of AI. Just
            speak, and we'll find exactly what you're looking for.
          </p>

          {/* Voice Search Interface */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              {/* Main Search Container */}
              <div
                className={`bg-white rounded-2xl shadow-2xl border border-gray-200/50 p-6 transition-all duration-300 ${
                  isListening
                    ? "ring-4 ring-blue-500/30 shadow-blue-500/20"
                    : ""
                }`}
              >
                {/* Voice Button */}
                <div className="flex items-center justify-center mb-6">
                  <button
                    onClick={handleVoiceSearch}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                    } shadow-xl`}
                  >
                    {isListening ? (
                      <MicOff className="h-8 w-8 text-white" />
                    ) : (
                      <Mic className="h-8 w-8 text-white" />
                    )}

                    {/* Listening Animation */}
                    {isListening && (
                      <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                    )}
                  </button>
                </div>

                {/* Status Text */}
                <div className="text-center mb-6">
                  {isListening ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Volume2 className="h-5 w-5 text-red-500 animate-pulse" />
                      <span className="text-red-500 font-medium">
                        Listening... Speak now
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-600">
                      Click the microphone or type below
                    </span>
                  )}
                </div>

                {/* Text Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setShowSuggestions(searchQuery.length > 0);
                    }}
                    onBlur={() => {
                      setIsSearchFocused(false);
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for restaurants, museums, parks..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  />
                </div>

                {/* Search Suggestions */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-10">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion)}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <Search className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {[
              "Restaurants",
              "Coffee Shops",
              "Museums",
              "Parks",
              "Shopping",
            ].map((category) => (
              <button
                key={category}
                onClick={() => handleSearch(category)}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 text-gray-700 font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Popular Destinations
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              Discover the most visited places around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">
                      {destination.rating}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {destination.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      {destination.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Navigation className="h-4 w-4" />
                    <span>{destination.visitors}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Clock className="h-6 w-6 text-gray-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Recent Searches
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 border border-gray-200 hover:border-gray-300"
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{search}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
