import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Tractor, 
  Home, 
  Activity, 
  Briefcase, 
  HeartHandshake, 
  DollarSign, 
  FileText, 
  Mic, 
  Volume2, 
  ArrowLeft,
  Users
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSimpleMode } from '../contexts/SimpleModeContext';
import { voiceService } from '../services/voice';

export const SimpleModeHome: React.FC<{ onOpenVoice: () => void }> = ({ onOpenVoice }) => {
  const { language, setLanguage } = useLanguage();
  const { toggleSimpleMode } = useSimpleMode();
  const navigate = useNavigate();

  const handleSpeakInstruction = () => {
    const text = language === 'ta'
      ? "வணக்கம். உங்களுக்கு தேவையான அரசு உதவியை தேர்ந்தெடுக்க கீழே உள்ள பெரிய பொத்தான்களில் ஒன்றை தொடவும் அல்லது மைக்ரோஃபோன் பொத்தானை அழுத்தி பேசவும்."
      : language === 'hi'
      ? "नमस्ते। अपनी आवश्यकतानुसार सरकारी योजना चुनने के लिए नीचे दिए गए किसी भी बटन को दबाएं या माइक दबाकर बोलें।"
      : "Hello. Tap any category below or press the microphone button to speak and find your benefits.";
    voiceService.speak(text, language);
  };

  const categories = [
    {
      id: "Education",
      ta: "🎓 படிப்பு / கல்வி உதவி",
      hi: "🎓 पढ़ाई / छात्रवृत्ति",
      en: "🎓 Education / Scholarship",
      color: "bg-blue-600 hover:bg-blue-700 text-white"
    },
    {
      id: "Agriculture",
      ta: "🌾 விவசாயம் / உழவர் உதவி",
      hi: "🌾 खेती / किसान योजना",
      en: "🌾 Agriculture / Farmers",
      color: "bg-emerald-600 hover:bg-emerald-700 text-white"
    },
    {
      id: "Health",
      ta: "🏥 மருத்துவம் / சிகிச்சை காப்பீடு",
      hi: "🏥 अस्पताल / आयुष्मान इलाज",
      en: "🏥 Health / Hospital Cover",
      color: "bg-rose-600 hover:bg-rose-700 text-white"
    },
    {
      id: "Housing",
      ta: "🏠 வீடு / குடியிருப்பு உதவி",
      hi: "🏠 मकान / आवास योजना",
      en: "🏠 Housing / PM Awas",
      color: "bg-amber-600 hover:bg-amber-700 text-white"
    },
    {
      id: "Employment",
      ta: "💼 வேலை / சிறுதொழில் கடன்",
      hi: "💼 रोजगार / मुद्रा ऋण",
      en: "💼 Jobs / MSME Loan",
      color: "bg-purple-600 hover:bg-purple-700 text-white"
    },
    {
      id: "Social Security",
      ta: "👵 முதியோர் / விதவை ஓய்வூதியம்",
      hi: "👵 वृद्धा / विधवा पेंशन",
      en: "👵 Widow / Senior Pension",
      color: "bg-teal-600 hover:bg-teal-700 text-white"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner with Speech & Exit */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-500 text-white shadow-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakInstruction}
            className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 shadow flex items-center gap-2 font-bold text-sm"
          >
            <Volume2 className="w-6 h-6 animate-pulse" />
            <span>
              {language === 'ta' ? 'குரல் வழி வழிகாட்டல்' : language === 'hi' ? 'आवाज मार्गदर्शन (सुनें)' : 'Voice Instructions (Listen)'}
            </span>
          </button>
        </div>

        <button
          onClick={toggleSimpleMode}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
        >
          {language === 'ta' ? 'எளிய முறையிலிருந்து வெளியேறுக ✕' : language === 'hi' ? 'सरल मोड से बाहर निकलें ✕' : 'Exit Simple Mode ✕'}
        </button>
      </div>

      {/* Big Voice Button */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          {language === 'ta' ? "பேசி உதவி பெறலாம்" : language === 'hi' ? "बोलकर योजना खोजें" : "Speak to Find Benefits"}
        </h2>
        <p className="text-sm font-medium text-emerald-100 max-w-md mx-auto">
          {language === 'ta' ? "கீழே உள்ள மைக்ரோஃபோன் பொத்தானை அழுத்தி உங்கள் தேவையை பேசுங்கள்." : language === 'hi' ? "नीचे दिए गए बटन को दबाएं और अपनी भाषा में बोलें।" : "Press the button below and speak in your language."}
        </p>

        <button
          onClick={onOpenVoice}
          className="w-24 h-24 rounded-full bg-white text-emerald-700 shadow-2xl mx-auto flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          <Mic className="w-12 h-12" />
        </button>
      </div>

      {/* Large Category Buttons (Requirement #29) */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white text-center">
          {language === 'ta' ? "அல்லது ஒரு பிரிவை தொடவும்:" : language === 'hi' ? "या किसी श्रेणी को चुनें:" : "Or Tap a Category:"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/explorer?category=${encodeURIComponent(c.id)}`)}
              className={`p-6 rounded-3xl font-bold text-lg text-left shadow-md transition-transform hover:scale-[1.02] flex items-center justify-between ${c.color}`}
            >
              <span>{language === 'ta' ? c.ta : language === 'hi' ? c.hi : c.en}</span>
              <span className="text-2xl">➔</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
