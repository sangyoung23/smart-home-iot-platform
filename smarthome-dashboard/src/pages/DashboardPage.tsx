import SummaryCards from "../components/dashboard/SummaryCards";
import RealtimePanel from "../components/dashboard/RealtimePanel";
import DailyChart from "../components/dashboard/DailyChart";

export default function DashboardPage() {
  return (
    <div className="space-y-35">
      <SummaryCards />
      <RealtimePanel />
      <DailyChart />
    </div>
  );
}
