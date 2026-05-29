"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Home() {
      const [latitude, setLatitude] = useState<number | null>(null);
      const [longitude, setLongitude] = useState<number | null>(null);
      const [error, setError] = useState("");


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

  return (
    <div >
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Geolocation App
          </h1>

          <button 
          onClick={getLocation}
          className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Get My Location
          </button>

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
        </div>

      </main>
    </div>
  );
}
