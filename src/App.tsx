import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { BadgeUnlockModal } from "./components/BadgeUnlockModal";
import Index from "./pages/Index";
import LogWorkout from "./pages/LogWorkout";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import TrainingPlans from "./pages/TrainingPlans";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="max-w-lg mx-auto min-h-screen bg-background relative">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/log" element={<LogWorkout />} />
            <Route path="/plans" element={<TrainingPlans />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
          <BadgeUnlockModal />
        </div>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;