
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

interface SettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ open, onOpenChange }) => {
  const [letterSize, setLetterSize] = useState<number>(100);
  const [gameTime, setGameTime] = useState<number>(5);
  
  // Load settings on mount
  useEffect(() => {
    const savedLetterSize = localStorage.getItem('letterSize');
    const savedGameTime = localStorage.getItem('gameTime');
    
    if (savedLetterSize) setLetterSize(parseInt(savedLetterSize));
    if (savedGameTime) setGameTime(parseInt(savedGameTime));
  }, []);
  
  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('letterSize', letterSize.toString());
    document.documentElement.style.setProperty('--letter-size-scale', `${letterSize}%`);
  }, [letterSize]);
  
  useEffect(() => {
    localStorage.setItem('gameTime', gameTime.toString());
  }, [gameTime]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-xl">Cilësimet e lojës</DialogTitle>
          <DialogDescription>
            Përshtatni lojën sipas preferencave tuaja
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Madhësia e shkronjave</label>
              <span className="text-sm text-gray-500">{letterSize}%</span>
            </div>
            <Slider
              value={[letterSize]}
              onValueChange={(values) => setLetterSize(values[0])}
              min={80}
              max={120}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Vogël</span>
              <span>Mesatare</span>
              <span>Madhe</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Koha e lojës (minuta)</label>
              <span className="text-sm text-gray-500">{gameTime}</span>
            </div>
            <Slider
              value={[gameTime]}
              onValueChange={(values) => setGameTime(values[0])}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 min</span>
              <span>5 min</span>
              <span>10 min</span>
            </div>
          </div>
          
          <p className="text-sm text-center text-gray-500 italic">
            Ndryshimet do të aplikohen në lojën tjetër
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
