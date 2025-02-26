
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Jobs from "@/pages/Jobs";
import JobDetails from "@/pages/JobDetails";
import PostJob from "@/pages/PostJob";
import Donate from "@/pages/Donate";
import NotFound from "@/pages/NotFound";
import SearchCandidates from "@/pages/SearchCandidates";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/search-candidates" element={<SearchCandidates />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
