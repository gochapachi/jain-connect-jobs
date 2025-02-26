
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUp() {
  const [email, setEmail] = useState("candidate@demo.com");
  const [password, setPassword] = useState("demo123");
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate');
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [phone, setPhone] = useState("1234567890");
  const [companyName, setCompanyName] = useState("Tech Corp");
  const [industry, setIndustry] = useState("Technology");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (userType === 'candidate') {
        await signUp(email, password, userType, {
          first_name: firstName,
          last_name: lastName,
          phone: phone
        });
        toast({
          title: "Candidate account created",
          description: "Please check your email to verify your account"
        });
      } else {
        await signUp(email, password, userType, {
          company_name: companyName,
          industry: industry,
          full_name: firstName + " " + lastName,
          phone: phone
        });
        toast({
          title: "Employer account created",
          description: "Please check your email to verify your account"
        });
      }
      navigate("/signin");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign up"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
        
        <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-md">
          <p className="text-sm">
            <strong>Demo Accounts:</strong><br />
            Candidate: candidate@demo.com / demo123<br />
            Employer: employer@demo.com / demo123
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup
              defaultValue="candidate"
              onValueChange={(value) => {
                setUserType(value as 'candidate' | 'employer');
                setEmail(value === 'candidate' ? 'candidate@demo.com' : 'employer@demo.com');
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="candidate" id="candidate" />
                <Label htmlFor="candidate">Candidate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employer" id="employer" />
                <Label htmlFor="employer">Employer</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {userType === 'employer' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
