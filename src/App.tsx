
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "@/pages/Index";
import Jobs from "@/pages/Jobs";
import JobDetails from "@/pages/JobDetails";
import PostJob from "@/pages/PostJob";
import SearchCandidates from "@/pages/SearchCandidates";
import Donate from "@/pages/Donate";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route 
            path="/post-job" 
            element={
              <ProtectedRoute allowedUserTypes={['employer']}>
                <PostJob />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search-candidates" 
            element={
              <ProtectedRoute allowedUserTypes={['employer']}>
                <SearchCandidates />
              </ProtectedRoute>
            } 
          />
          <Route path="/donate" element={<Donate />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
