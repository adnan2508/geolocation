"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Home() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [error, setError] = useState("");

  // Get Location Function
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError("");
      },
      (error) => {
        setError(error.message);
      }
    );
  }

  // Get Restaurant function
  const getRestaurant = () => {
    console.log("Fetching restaurants...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(latitude, longitude);

        const query = `
          [out:json];
          node
          ["amenity"="restaurant"]
          (around:3000, ${latitude}, ${longitude});
          out;
        `;

        fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.elements);
            setRestaurants(data.elements);
          })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <div >
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Geolocation App
          </h1>

          <div className="flex flex-col gap-3 justify-start items-start md:flex-row">
            <button
              onClick={getLocation}
              className="bg-black text-white px-6 py-3 rounded-lg hover:cursor-pointer"
            >
              Get My Location
            </button>

            <button
              onClick={getRestaurant}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:cursor-pointer"
            >
              Find Restaurants
            </button>
          </div>


          {latitude && longitude && (
            <div className="mt-6 space-y-4">
              <div className="bg-white p-4 rounded-xl shadow">
                <p>
                  <strong>Latitude:</strong> {latitude}
                </p>

                <p>
                  <strong>Longitude:</strong> {longitude}
                </p>
              </div>

              <Map
                latitude={latitude}
                longitude={longitude}
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 mt-4">
              {error}
            </p>
          )}

          {/* Restaurent rendering area */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Nearby Restaurants:
            </h2>

            <div className="space-y-4">
              {
                restaurants.map((restaurant, index) => (
                  <div 
                  key={index} 
                  className="bg-white p-4 rounded-xl shadow">
                    <h3>{restaurant.tags?.name || "Unnamed Restaurant"}</h3>

                    <p>
                      Latitude: {restaurant.lat}
                    </p>

                    <p>
                      Longitude: {restaurant.lon}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
