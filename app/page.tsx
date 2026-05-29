import Map from "@/components/Map";


export default function Home() {
  return (
    <div >
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Geolocation App
          </h1>

          <button className="bg-black text-white px-6 py-3 rounded-lg">
            Get My Location
          </button>

          <Map />
        </div>

      </main>
    </div>
  );
}
