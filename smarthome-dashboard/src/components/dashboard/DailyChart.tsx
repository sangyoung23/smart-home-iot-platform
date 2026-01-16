import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SENSOR_TYPES = [
  "TEMPERATURE",
  "HUMIDITY",
  "AIR_QUALITY",
  "POWER",
  "BATTERY",
] as const;

type SensorType = (typeof SENSOR_TYPES)[number];

interface ApiItem {
  stat_date: string;
  avg_value: number;
}

interface ChartData {
  date: string;
  value: number;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function firstDayOfThisMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}-01`;
}

export default function DailyChart() {
  const [sensorType, setSensorType] = useState<SensorType>("TEMPERATURE");

  const [from, setFrom] = useState(firstDayOfThisMonth);
  const [to, setTo] = useState(today);
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchStats() {
    setLoading(true);

    try {
      const res = await api.get("/api/dashboard/stats", {
        params: {
          sensorType,
          deviceId: "device-01",
          from,
          to,
        },
      });

      const chartData: ChartData[] = res.data.data.map((item: ApiItem) => ({
        date: item.stat_date,
        value: item.avg_value,
      }));

      setData(chartData);
    } catch (e) {
      console.error("차트 데이터 조회 실패", e);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  // 최초 로딩 + 센서 변경 시 자동 조회
  useEffect(() => {
    fetchStats();
  }, [sensorType]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>일별 통계</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 컨트롤 영역 */}
        <div className="flex flex-wrap items-center gap-4">
          {/* 센서 선택 */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Sensor</span>
            <select
              value={sensorType}
              onChange={(e) => setSensorType(e.target.value as SensorType)}
              className="border rounded px-2 py-1"
            >
              {SENSOR_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* 날짜 선택 */}
          <div className="flex items-center gap-2">
            <span className="text-sm">From</span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">To</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>

          <button
            onClick={fetchStats}
            className="ml-auto px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            조회
          </button>
        </div>

        {/* 차트 */}
        <div className="h-64">
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : data.length === 0 ? (
            <p className="text-sm text-gray-400">집계 데이터가 없습니다.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
