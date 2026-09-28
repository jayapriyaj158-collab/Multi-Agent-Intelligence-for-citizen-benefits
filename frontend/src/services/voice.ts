// Voice service using Web Speech API (SpeechRecognition + SpeechSynthesis)

export interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  error?: string;
}

class VoiceService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.isSupported = true;
      }
      if ('speechSynthesis' in window) {
        this.synthesis = window.speechSynthesis;
      }
    }
  }

  public getSupported(): boolean {
    return this.isSupported;
  }

  public startListening(
    language: string,
    onResult: (text: string, isFinal: boolean) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError('Speech Recognition is not natively supported in this browser. Please use Chrome/Edge or type your query.');
      return;
    }

    // Set recognition language
    if (language === 'ta') {
      this.recognition.lang = 'ta-IN';
    } else if (language === 'hi') {
      this.recognition.lang = 'hi-IN';
    } else {
      this.recognition.lang = 'en-IN';
    }

    this.recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      onResult(final || interim, Boolean(final));
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error || 'Speech capture error');
    };

    this.recognition.onend = () => {
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn('Recognition already started or error', e);
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }

  public speak(text: string, language: string = 'en', onComplete?: () => void) {
    if (!this.synthesis) {
      if (onComplete) onComplete();
      return;
    }

    this.synthesis.cancel(); // Stop any ongoing speech

    // Clean text of markdown characters
    const cleanText = text.replace(/[*#_`~\[\]\(\)]/g, '').replace(/https?:\/\/\S+/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (language === 'ta') {
      utterance.lang = 'ta-IN';
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95; // Clear speaking rate
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      if (onComplete) onComplete();
    };

    this.synthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}

export const voiceService = new VoiceService();
