
import React, { useState } from 'react';
import { Calendar, HelpCircle, Sun, Moon } from "lucide-react";
import { useIsMobile } from '../hooks/use-mobile';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { format } from "date-fns";

const Header = () => {
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showHelp, setShowHelp] = useState(false);
  
  // Check if we have played words for the selected date
  const getPlayedWords = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    const playedWordsStr = localStorage.getItem('playedWords');
    
    if (playedWordsStr) {
      const playedWords = JSON.parse(playedWordsStr);
      return playedWords[dateStr] || [];
    }
    
    return [];
  };
  
  const playedWords = getPlayedWords(date);
  const today = new Date();
  const isToday = date && today.toISOString().split('T')[0] === date.toISOString().split('T')[0];
  
  return (
    <header className="flex justify-between items-center p-2 sm:p-4 border-b dark:border-gray-700 dark:bg-gray-800">
      <div>
        <h1 className="text-xl sm:text-3xl font-bold dark:text-white">Fjalë qejfi</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-300" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="end">
            <div className="flex flex-col space-y-2 p-2">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className={`p-3 pointer-events-auto`}
              />
              <div className="px-4 py-2 border-t">
                <h3 className="font-medium mb-2">
                  {date ? format(date, 'PPPP') : 'Zgjidh një datë'}
                </h3>
                
                {playedWords.length > 0 ? (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fjalët e gjetura: {playedWords.length}</p>
                    <div className="max-h-40 overflow-y-auto">
                      {playedWords.map((word: any, index: number) => (
                        <div key={index} className="flex justify-between items-center text-sm py-1 border-b border-dashed">
                          <span>{word.original}</span>
                          <span className="text-blue-600 dark:text-blue-400">
                            {word.solveTime}s
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nuk ka fjalë për këtë datë
                  </p>
                )}
                
                {!isToday && (
                  <Button 
                    className="w-full mt-2"
                    onClick={() => setDate(new Date())}
                  >
                    Kthehu tek dita e sotme
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Dialog open={showHelp} onOpenChange={setShowHelp}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-300" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Si të luash Fjalë Qejfi</DialogTitle>
              <DialogDescription>
                Udhëzimet e lojës
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p>Qëllimi i lojës është të gjeni fjalë nga shkronjat e përziera.</p>
              
              <ol className="list-decimal pl-5 space-y-2">
                <li>Shikoni shkronjat e përziera në ekran.</li>
                <li>Përdorni shkronjat për të formuar një fjalë të plotë shqip.</li>
                <li>Prek shkronjat për t'i zgjedhur dhe për të formuar fjalën.</li>
                <li>Për të hequr një shkronjë, prekeni përsëri.</li>
                <li>Për të fshirë të gjitha shkronjat e zgjedhura, shtypni butonin "Pastro".</li>
                <li>Keni 5 minuta për të gjetur sa më shumë fjalë.</li>
                <li>Loja mbaron kur koha mbaron.</li>
              </ol>
              
              <p className="font-semibold">Këshilla:</p>
              <ul className="list-disc pl-5">
                <li>Nëse nuk mund të gjeni një fjalë, kaloni në fjalën tjetër.</li>
                <li>Mundohuni të gjeni sa më shumë fjalë për të maksimizuar pikët.</li>
                <li>Fjalët e gjetura ruhen për çdo ditë dhe mund t'i shikoni në kalendar.</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          onClick={toggleTheme} 
          variant="ghost"
          className="p-1 sm:p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
