import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import api from "../../lib/api";

interface Sensor {
  currentValue: number | null;
  lastDataTime: string | null;
  normal: boolean;
  sensorType: string;
  statusMessage: string;
}

interface DashboardSummaryResponse {
  lastCollectedAt: string;
  normalSensorCount: number;
  sensors: Sensor[];
  todayAggregationCount: number;
  totalSensorCount: number;
}

function formatValue(value: number | null) {
  return value !== null ? value.toFixed(2) : "--";
}

function formatDateTime(value: string) {
  // ISO 문자열 → 보기 좋게
  return value.replace("T", " ").split(".")[0];
}

export default function SummaryCards() {
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await api.get("/api/dashboard/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!summary) return <p>No data</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* 🔹 상단 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>마지막 갱신</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              {formatDateTime(summary.lastCollectedAt)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>정상 센서</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              {summary.normalSensorCount} / {summary.totalSensorCount} 개
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>금일 집계 건수</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              {summary.todayAggregationCount} 건
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 센서 상태 카드 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {summary.sensors.map((sensor) => (
          <Card key={sensor.sensorType}>
            <CardHeader>
              <CardTitle>{sensor.sensorType}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatValue(sensor.currentValue)}
              </p>

              <p
                className={`text-sm ${
                  sensor.normal ? "text-green-600" : "text-red-500"
                }`}
              >
                {sensor.statusMessage}
              </p>

              <p className="text-xs text-gray-400">
                Last: {sensor.lastDataTime ?? "-"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
