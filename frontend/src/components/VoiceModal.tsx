import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { voiceService } from '../services/voice';
import { api } from '../services/api';
import { useLanguage, LanguageCode } from '../contexts/LanguageContext';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQueryComplete?: (response: any) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose, onQueryComplete }) => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [responseReply, setResponseReply] = useState<string>('');
  const defaultStatusMsg = language === 'ta' ? 'மைக்ரோஃபோனைத் தொட்டு உங்கள் மொழியில் பேசவும்' : language === 'hi' ? 'माइक्रोफ़ोन दबाएं और अपनी भाषा में बोलें' : 'Tap microphone and speak in your language';
  const [statusMsg, setStatusMsg] = useState<string>(defaultStatusMsg);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      voiceService.stopListening();
      voiceService.stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
      setTranscript('');
      setResponseReply('');
      setStatusMsg(defaultStatusMsg);
    }
  }, [isOpen, language]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('');
    setResponseReply('');
    setStatusMsg(`Listening in ${language === 'ta' ? 'Tamil (தமிழ்)' : language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}... Speak now.`);

    voiceService.startListening(
      language,
      (text: string, isFinal: boolean) => {
        setTranscript(text);
        if (isFinal) {
          handleProcessVoiceInput(text);
        }
      },
      (err: string) => {
        setIsListening(false);
        setStatusMsg(`Voice notice: ${err}. You can also pick a sample prompt below.`);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleStopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
    if (transcript.trim()) {
      handleProcessVoiceInput(transcript);
    }
  };

  const handleProcessVoiceInput = async (spokenText: string) => {
    if (!spokenText.trim()) return;

    voiceService.stopListening();
    setIsListening(false);
    setIsLoading(true);
    setStatusMsg('Multi-Agent AI analyzing intent and verified government schemes...');

    try {
      const res = await api.sendChatMessage(spokenText, undefined, language);
      setResponseReply(res.reply);
      setStatusMsg('AI Response received.');

      // Check for voice navigation
      if (res.card_type === 'navigation' && res.card_data?.route) {
        setStatusMsg(`Voice Navigation: Opening ${res.card_data.route}...`);
        setTimeout(() => {
          onClose();
          navigate(res.card_data.route);
        }, 1500);
      } else if (onQueryComplete) {
        onQueryComplete(res);
      }

      // Read response aloud using Text-to-Speech
      setIsSpeaking(true);
      voiceService.speak(res.reply, res.language || language, () => {
        setIsSpeaking(false);
      });
    } catch (e: any) {
      setStatusMsg(`Processing error: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoPrompt = (sample: string, langCode: LanguageCode) => {
    setLanguage(langCode);
    setTranscript(sample);
    handleProcessVoiceInput(sample);
  };

  const handleStopSpeaking = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t.voiceMode}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'ta' ? 'தமிழ், இந்தி அல்லது ஆங்கிலத்தில் பேசலாம்' : language === 'hi' ? 'हिंदी, तमिल या अंग्रेजी में बोलें' : 'Speak in Tamil, Hindi, or English'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language selector tabs */}
        <div className="flex items-center justify-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
              language === 'en' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ta')}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
              language === 'ta' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'
            }`}
          >
            தமிழ்
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
              language === 'hi' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'
            }`}
          >
            हिन्दी
          </button>
        </div>

        {/* Central Visualizer & Mic Button */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative flex items-center justify-center">
            {/* Pulsing rings when listening */}
            {isListening && (
              <>
                <span className="absolute w-28 h-28 rounded-full bg-emerald-500/20 animate-ping"></span>
                <span className="absolute w-36 h-36 rounded-full bg-emerald-500/10 animate-pulse"></span>
              </>
            )}

            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              disabled={isLoading}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
                isListening
                  ? 'bg-rose-600 scale-110 shadow-rose-500/40 animate-pulse'
                  : 'bg-gradient-to-tr from-emerald-600 to-teal-600 hover:scale-105 shadow-emerald-500/30'
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 text-center max-w-xs">
            {statusMsg}
          </p>

          {/* Waveform indicator */}
          {isListening && (
            <div className="flex items-center gap-1.5 h-8">
              {[40, 70, 100, 60, 90, 45, 80, 50, 95, 30].map((h, idx) => (
                <span
                  key={idx}
                  style={{ height: `${h}%` }}
                  className="w-1 bg-emerald-500 rounded-full animate-wave"
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* Recognized Transcript Area */}
        {transcript && (
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {language === 'ta' ? 'நீங்கள் பேசியது:' : language === 'hi' ? 'आपने कहा:' : 'You Spoke:'}
            </span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
              "{transcript}"
            </p>
          </div>
        )}

        {/* AI Response & TTS Player */}
        {responseReply && (
          <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {language === 'ta' ? 'AI உதவியாளர் பதில்:' : language === 'hi' ? 'एआई सहायक उत्तर:' : 'AI Assistant Response:'}
              </span>
              {isSpeaking ? (
                <button
                  onClick={handleStopSpeaking}
                  className="inline-flex items-center gap-1 text-[11px] text-rose-600 font-medium px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60"
                >
                  <VolumeX className="w-3 h-3" /> {t.stopVoice}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSpeaking(true);
                    voiceService.speak(responseReply, language, () => setIsSpeaking(false));
                  }}
                  className="inline-flex items-center gap-1 text-[11px] text-indigo-600 font-medium px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60"
                >
                  <Volume2 className="w-3 h-3" /> {t.speakAloud}
                </button>
              )}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              {responseReply}
            </p>
          </div>
        )}

        {/* One-Click Sample Voice Scenarios */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {language === 'ta' ? 'விரைவு குரல் மாதிரி உரையாடல்கள்:' : language === 'hi' ? 'त्वरित आवाज परीक्षण परिदृश्य:' : 'Quick 1-Click Voice Test Scenarios:'}
          </span>
          <div className="grid grid-cols-1 gap-1.5 text-xs">
            <button
              onClick={() => handleDemoPrompt("Naan college student. En family income around 2 lakh. Enakku government scholarship irukka?", "ta")}
              className="text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-700 dark:text-slate-300"
            >
              <span className="truncate">🗣 "Naan college student, income 2 lakh... scholarship irukka?" (Tamil)</span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
            </button>
            <button
              onClick={() => handleDemoPrompt("Main kisan hu, meri fasal bima aur kisan yojana ke bare me batayein.", "hi")}
              className="text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-700 dark:text-slate-300"
            >
              <span className="truncate">🗣 "मैं किसान हूँ, फसल बीमा और किसान योजना बताएं" (Hindi)</span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
            </button>
            <button
              onClick={() => handleDemoPrompt("Open my applications", "en")}
              className="text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-700 dark:text-slate-300"
            >
              <span className="truncate">🗣 "Open my applications" (Voice Navigation)</span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
