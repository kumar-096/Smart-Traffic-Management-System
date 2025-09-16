export default function TrafficStats() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
      <h2 className="text-xl font-bold mb-4">🚗 Lane-wise Vehicle Counts</h2>
      <ul className="space-y-2 text-gray-700">
        <li>Lane 1: <b>20 Cars</b>, <b>5 Bikes</b></li>
        <li>Lane 2: <b>10 Cars</b>, <b>2 Buses</b></li>
      </ul>
    </div>
  );
}

