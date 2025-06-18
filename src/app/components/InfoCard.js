export default function InfoCard({ place }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-bold">{place.name}</h2>
      <p className="text-sm text-gray-600">{place.description}</p>
      <p className="text-xs mt-2 italic text-purple-700">{place.category}</p>
    </div>
  );
}
