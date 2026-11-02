import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Clock, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Check, 
  X,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { NotificationItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const NotificationPopover: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchNotifs = async () => {
    try {
      const data = await api.getNotifications();
      setNotifications(data);
    } catch (e) {
      console.warn('Failed to fetch notifications', e);
    }
  };

  useEffect(() => {
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 30000); // refresh periodically
    return () => clearInterval(interval);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleMarkAsRead = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const handleNotificationClick = (n: NotificationItem) => {
    if (!n.is_read) {
      api.markNotificationRead(n.id).catch(() => {});
      setNotifications((prev) =>
        prev.map((item) => (item.id === n.id ? { ...item, is_read: true } : item))
      );
    }
    setIsOpen(false);
    if (n.action_url) {
      navigate(n.action_url);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DEADLINE':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'MISSING_DOC':
        return <FileText className="w-4 h-4 text-rose-500" />;
      case 'BENEFIT_ALERT':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'DEADLINE':
        return (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
            {language === 'ta' ? 'காலக்கெடு' : language === 'hi' ? 'समय-सीमा' : 'DEADLINE'}
          </span>
        );
      case 'MISSING_DOC':
        return (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
            {language === 'ta' ? 'ஆவண எச்சரிக்கை' : language === 'hi' ? 'दस्तावेज़ सूचना' : 'DOC ALERT'}
          </span>
        );
      case 'BENEFIT_ALERT':
        return (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300">
            {language === 'ta' ? 'புதிய பலன்' : language === 'hi' ? 'नया लाभ' : 'NEW BENEFIT'}
          </span>
        );
      default:
        return (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
            {language === 'ta' ? 'நிலை' : language === 'hi' ? 'स्थिति' : 'STATUS'}
          </span>
        );
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title={language === 'ta' ? 'அறிவிப்புகள்' : language === 'hi' ? 'सूचनाएं' : 'Notifications'}
        className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white shadow-xs">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {language === 'ta' ? 'அறிவிப்புகள்' : language === 'hi' ? 'सूचनाएं' : 'Smart Notifications'}
              </h4>
              {unreadCount > 0 && (
                <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.2 rounded-full">
                  {unreadCount} {language === 'ta' ? 'புதியவை' : language === 'hi' ? 'नई' : 'new'}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-xs p-1"
            >
              ✕
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {notifications.length === 0 ? (
              <div className="p-8 text-center space-y-1 text-slate-400">
                <Bell className="w-8 h-8 mx-auto opacity-30" />
                <p className="text-xs font-medium">
                  {language === 'ta' ? 'புதிய அறிவிப்புகள் இல்லை' : language === 'hi' ? 'कोई नई सूचना नहीं है' : 'No new notifications'}
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer space-y-1 text-left ${
                    !n.is_read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {getTypeIcon(n.notification_type)}
                      <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {n.title}
                      </span>
                    </div>
                    {getTypeBadge(n.notification_type)}
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 pl-5.5">
                    {n.message}
                  </p>

                  <div className="flex items-center justify-between pt-1 pl-5.5 text-[10px] text-slate-400">
                    <span>
                      {n.action_url ? (
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-0.5 hover:underline">
                          {language === 'ta' ? 'நடவடிக்கை எடுக்க' : language === 'hi' ? 'कार्रवाई करें' : 'Take action'} <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      ) : null}
                    </span>
                    {!n.is_read && (
                      <button
                        onClick={(e) => handleMarkAsRead(n.id, e)}
                        title={language === 'ta' ? 'படித்ததாகக் குறிக்கவும்' : language === 'hi' ? 'पढ़ा हुआ चिह्नित करें' : 'Mark as read'}
                        className="text-slate-400 hover:text-indigo-600 font-medium flex items-center gap-0.5"
                      >
                        <Check className="w-3 h-3" />
                        <span>{language === 'ta' ? 'படித்தேன்' : language === 'hi' ? 'पढ़ा' : 'Dismiss'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
