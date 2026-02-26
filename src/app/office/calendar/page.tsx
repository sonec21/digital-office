'use client';

import calendar from '@/brain/seeds/calendar.json';

export default function CalendarPage() {
  const eventsByDate = calendar.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, typeof calendar>);

  const sortedDates = Object.keys(eventsByDate).sort();

  const getTypeStyles = (type: string) => {
    const styles: Record<string, { bg: string; border: string; text: string; label: string }> = {
      demo: { bg: 'bg-blue-50', border: 'border-l-blue-500', text: 'text-blue-700', label: 'Demo' },
      internal: { bg: 'bg-emerald-50', border: 'border-l-emerald-500', text: 'text-emerald-700', label: 'Internal' },
      meeting: { bg: 'bg-violet-50', border: 'border-l-violet-500', text: 'text-violet-700', label: 'Meeting' },
      onboarding: { bg: 'bg-amber-50', border: 'border-l-amber-500', text: 'text-amber-700', label: 'Onboarding' },
    };
    return styles[type] || { bg: 'bg-slate-50', border: 'border-l-slate-400', text: 'text-slate-700', label: type };
  };

  const getStatusBadge = (status: string) => {
    return status === 'confirmed'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-amber-100 text-amber-700';
  };

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const isFuture = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr > today;
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Calendar</h2>
          <p className="text-sm text-slate-500 mt-1">Upcoming meetings and events</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + New Event
        </button>
      </div>

      <div className="space-y-8">
        {sortedDates.map((date) => {
          const isTodayDate = isToday(date);
          const isFutureDate = isFuture(date);
          
          return (
            <div key={date}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className={`text-sm font-semibold ${
                  isTodayDate ? 'text-blue-600' : isFutureDate ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </h3>
                {isTodayDate && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Today
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                {eventsByDate[date].map((event) => {
                  const styles = getTypeStyles(event.type);
                  
                  return (
                    <div 
                      key={event.id} 
                      className={`bg-white rounded-lg shadow-sm border border-slate-200 border-l-4 ${styles.border} p-4 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900">{event.title}</h4>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${styles.bg} ${styles.text} font-medium`}>
                              {styles.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <span>🕐</span> {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <span>⏱️</span> {event.duration} min
                            </span>
                            <span className="flex items-center gap-1">
                              <span>👤</span> {event.attendees}
                            </span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {calendar.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-4xl mb-3">📅</div>
          <p className="text-slate-500 font-medium">No events scheduled</p>
          <p className="text-sm text-slate-400 mt-1">Create your first event to get started!</p>
        </div>
      )}
    </div>
  );
}
