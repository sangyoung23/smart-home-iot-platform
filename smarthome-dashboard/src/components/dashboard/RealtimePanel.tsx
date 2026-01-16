import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import api from "../../lib/api";

interface RealtimeSensor {
  sensorType: string;
  currentValue: number | null;
  lastDataTime: string | null;
  normal: boolean;
  statusMessage: string;
}

interface DashboardRealtimeResponse {
  deviceId: string;
  lastUpdatedAt: string | null;
  sensors: RealtimeSensor[];
}

const DEVICE_ID = "device-01";

function formatDateTime(value: string | null) {
  if (!value) return "-";

  // 강제로 UTC로 해석
  const date = new Date(value.replace(" ", "T") + "Z");

  return date.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    hour12: true,
  });
}

export default function RealtimePanel() {
  const [data, setData] = useState<DashboardRealtimeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealtime = async () => {
      try {
        const res = await api.get("/api/dashboard/realtime", {
          params: { deviceId: DEVICE_ID },
        });

        setData(res.data);
      } catch (err) {
        console.error("실시간 데이터 조회 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRealtime();
    const interval = setInterval(fetchRealtime, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>실시간 센서 데이터</CardTitle>

        <p className="text-xs text-muted-foreground">
          마지막 갱신: {formatDateTime(data?.lastUpdatedAt ?? null)}
        </p>
      </CardHeader>

      <CardContent>
        {loading && <p className="text-muted-foreground">로딩 중...</p>}

        {!loading && (!data || data.sensors.length === 0) && (
          <p className="text-muted-foreground">데이터 없음</p>
        )}

        {!loading && data && data.sensors.length > 0 && (
          <div className="space-y-3">
            {data.sensors.map((sensor) => (
              <div
                key={sensor.sensorType}
                className={`flex items-center justify-between rounded border px-3 py-2
                  ${sensor.normal ? "border-green-300" : "border-red-300"}
                `}
              >
                <div>
                  <p className="font-medium">{sensor.sensorType}</p>

                  <p className="text-xs text-muted-foreground">
                    {sensor.statusMessage ?? "-"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(sensor.lastDataTime)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">
                    {sensor.currentValue ?? "-"}
                  </p>

                  <p
                    className={`text-xs font-medium ${
                      sensor.normal ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {sensor.normal ? "정상" : "비정상"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
