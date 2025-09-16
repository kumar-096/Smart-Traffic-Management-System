export default function SignalControl() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
      <h2 className="text-xl font-bold mb-4">🚦 Signal Control</h2>
      <p className="mb-4">Current Green Time: <b>25 sec</b></p>
      <div className="flex gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          Extend Green
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
          Reduce Green
        </button>
      </div>
    </div>
  );
}
