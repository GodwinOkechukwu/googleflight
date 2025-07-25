import React, { useState, useEffect } from "react";
import {
  Search,
  Plane,
  Calendar,
  Users,
  ArrowLeftRight,
  MapPin,
  Clock,
  Star,
} from "lucide-react";

const FlightsApp = () => {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    tripType: "roundtrip",
  });

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("search");

  // Popular destinations data
  const popularDestinations = [
    { city: "New York", country: "USA", code: "NYC", price: "$299" },
    { city: "London", country: "UK", code: "LON", price: "$599" },
    { city: "Paris", country: "France", code: "PAR", price: "$649" },
    { city: "Tokyo", country: "Japan", code: "NRT", price: "$899" },
    { city: "Dubai", country: "UAE", code: "DXB", price: "$799" },
    { city: "Sydney", country: "Australia", code: "SYD", price: "$1199" },
  ];

  // Mock flight data for demonstration
  const mockFlights = [
    {
      id: 1,
      airline: "American Airlines",
      flightNumber: "AA1234",
      departure: { time: "08:30", airport: "JFK", city: "New York" },
      arrival: { time: "11:45", airport: "LAX", city: "Los Angeles" },
      duration: "5h 15m",
      stops: "Nonstop",
      price: 299,
      rating: 4.2,
    },
    {
      id: 2,
      airline: "Delta Air Lines",
      flightNumber: "DL5678",
      departure: { time: "14:20", airport: "JFK", city: "New York" },
      arrival: { time: "17:55", airport: "LAX", city: "Los Angeles" },
      duration: "5h 35m",
      stops: "Nonstop",
      price: 329,
      rating: 4.5,
    },
    {
      id: 3,
      airline: "United Airlines",
      flightNumber: "UA9012",
      departure: { time: "19:10", airport: "JFK", city: "New York" },
      arrival: { time: "22:30", airport: "LAX", city: "Los Angeles" },
      duration: "5h 20m",
      stops: "Nonstop",
      price: 279,
      rating: 4.0,
    },
  ];

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    if (!searchData.from || !searchData.to || !searchData.departDate) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    setError("");
    setActiveTab("results");

    try {
      // In a real implementation, I would make an API call here
      //   const queryParams = new URLSearchParams({
      //     originSkyId: searchData.from,
      //     destinationSkyId: searchData.to,
      //     originEntityId: searchData.from,
      //     destinationEntityId: searchData.to,
      //     date: searchData.departDate,
      //     returnDate: searchData.returnDate || "",
      //     cabinClass: "economy",
      //     adults: searchData.passengers,
      //     currency: "USD",
      //   });

      //   const response = await fetch(
      //     `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightEverywhere?${queryParams}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "X-RapidAPI-Key":
      //           "8b0e98f961msh7673e4320554fc0p11ffd5jsna5e0907bc48a",
      //         "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
      //       },
      //     }
      //   );

      //   console.log(response);

      // For demo purposes, using mock data
      setTimeout(() => {
        setFlights(mockFlights);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError("Failed to search flights. Please try again.");
      setLoading(false);
    }
  };

  const swapLocations = () => {
    setSearchData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Flights</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab("search")}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === "search"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                Search
              </button>
              <button
                onClick={() => setActiveTab("explore")}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === "explore"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                Explore
              </button>
              <button
                onClick={() => setActiveTab("trips")}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === "trips"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                My Trips
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "search" && (
          <div className="space-y-8">
            {/* Search Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Trip Type Selector */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => handleInputChange("tripType", "roundtrip")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    searchData.tripType === "roundtrip"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}>
                  Round trip
                </button>
                <button
                  onClick={() => handleInputChange("tripType", "oneway")}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    searchData.tripType === "oneway"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}>
                  One way
                </button>
              </div>

              {/* Search Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {/* From */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Where from?"
                      value={searchData.from}
                      onChange={(e) =>
                        handleInputChange("from", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex items-end justify-center pb-3 lg:pb-0">
                  <button
                    onClick={swapLocations}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeftRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* To */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Where to?"
                      value={searchData.to}
                      onChange={(e) => handleInputChange("to", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Depart Date */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Depart
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={searchData.departDate}
                      onChange={(e) =>
                        handleInputChange("departDate", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Return Date */}
                {searchData.tripType === "roundtrip" && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        value={searchData.returnDate}
                        onChange={(e) =>
                          handleInputChange("returnDate", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Passengers */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="relative w-full sm:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      value={searchData.passengers}
                      onChange={(e) =>
                        handleInputChange(
                          "passengers",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} passenger{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 !bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>{loading ? "Searching..." : "Search flights"}</span>
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                  {error}
                </div>
              )}
            </div>

            {/* Popular Destinations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Popular destinations
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularDestinations.map((dest, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      handleInputChange("to", dest.code);
                    }}>
                    <div className="text-sm font-medium text-gray-900">
                      {dest.city}
                    </div>
                    <div className="text-xs text-gray-500">{dest.country}</div>
                    <div className="text-sm font-semibold text-blue-600 mt-1">
                      {dest.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "results" && (
          <div className="space-y-6">
            {/* Search Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {searchData.from} → {searchData.to}
                  </h1>
                  <p className="text-gray-600">
                    {formatDate(searchData.departDate)} •{" "}
                    {searchData.passengers} passenger
                    {searchData.passengers > 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("search")}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Edit search
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-xl shadow-lg p-12">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-lg text-gray-600">
                    Searching for flights...
                  </span>
                </div>
              </div>
            )}

            {/* Flight Results */}
            {!loading && flights.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {flights.length} flights found
                  </h2>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Best</option>
                    <option>Cheapest</option>
                    <option>Fastest</option>
                  </select>
                </div>

                {flights.map((flight) => (
                  <div
                    key={flight.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Plane className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {flight.airline}
                            </div>
                            <div className="text-sm text-gray-500">
                              {flight.flightNumber}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <div>
                            <div className="text-2xl font-bold text-gray-900">
                              {flight.departure.time}
                            </div>
                            <div className="text-sm text-gray-600">
                              {flight.departure.airport}
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.departure.city}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-1">
                              <div className="flex-1 h-px bg-gray-300"></div>
                              <Clock className="h-4 w-4 text-gray-400" />
                              <div className="flex-1 h-px bg-gray-300"></div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {flight.duration}
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.stops}
                            </div>
                          </div>

                          <div className="text-right md:text-left">
                            <div className="text-2xl font-bold text-gray-900">
                              {flight.arrival.time}
                            </div>
                            <div className="text-sm text-gray-600">
                              {flight.arrival.airport}
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.arrival.city}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-8 flex flex-col items-end">
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">
                            {flight.rating}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          ${flight.price}
                        </div>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "explore" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularDestinations.map((dest, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 !bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{dest.city}</h3>
                    <p className="text-sm">{dest.country}</p>
                    <p className="text-lg font-semibold mt-1">
                      From {dest.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "trips" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My trips</h2>
            <div className="text-center py-12">
              <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No trips booked yet</p>
              <button
                onClick={() => setActiveTab("search")}
                className="mt-4 px-6 py-2 !bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Search for flights
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FlightsApp;
