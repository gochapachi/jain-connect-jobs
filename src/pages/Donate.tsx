
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const DonationOption = ({ amount, selected, onClick }: { amount: number; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-lg border transition-all ${
      selected
        ? "border-accent bg-accent/10 text-accent"
        : "border-gray-200 hover:border-accent/50"
    }`}
  >
    ₹{amount.toLocaleString()}
  </button>
);

const Donate = () => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = () => {
    const amount = selectedAmount || Number(customAmount);
    if (!amount) {
      toast({
        title: "Please select an amount",
        description: "Choose a preset amount or enter a custom amount to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Thank you for your donation!",
      description: `Your donation of ₹${amount.toLocaleString()} will help support our community initiatives.`,
    });
    
    setSelectedAmount(null);
    setCustomAmount("");
  };

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-2xl mx-auto text-center mb-12 animate-fade-in">
          <Heart className="w-12 h-12 text-accent mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-primary mb-4">Support Our Community</h1>
          <p className="text-gray-600">
            Your donation helps us maintain the platform and support various community initiatives.
          </p>
        </div>
        
        <Card className="max-w-xl mx-auto p-8 animate-slide-in">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1000, 2500, 5000].map((amount) => (
              <DonationOption
                key={amount}
                amount={amount}
                selected={selectedAmount === amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
              />
            ))}
          </div>
          
          <div className="mb-8">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Or enter a custom amount
            </label>
            <Input
              type="number"
              min="1"
              placeholder="Enter amount in ₹"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="text-lg"
            />
          </div>
          
          <Button
            onClick={handleDonate}
            className="w-full bg-accent hover:bg-accent/90"
            size="lg"
          >
            Donate Now
          </Button>
          
          <p className="text-sm text-gray-500 mt-4 text-center">
            All donations are securely processed and will receive a tax receipt.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Donate;
