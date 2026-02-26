import calendar from '@/brain/seeds/calendar.json';

export default function CalendarPage() {
  // Group events by date
  const eventsByDate = calendar.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, typeof calendar>);

  const sortedDates = Object.keys(eventsByDate).sort();

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      demo: 'border-blue-500 bg-blue-50',
      internal: 'border-green-500 bg-green-50',
      meeting: 'border-purple-500 bg-purple-50',
      onboarding: 'border-orange-500 bg-orange-50',
    };
    return colors[type] || 'border-gray-500 bg-gray-50';
  };

  const getStatusBadge = (status: string) => {
    return status === 'confirmed'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
          <p className="text-gray-500 mt-1">Upcoming meetings and events</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + New Event
        </button>
      </div>

      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            <div className="space-y-3">
              {eventsByDate[date].map((event) => (
                <div 
                  key={event.id} 
                  className={`bg-white rounded-lg border-l-4 shadow-sm p-4 ${getTypeColor(event.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        ⏰ {event.time} • {event.duration} min • {event.attendees}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {calendar.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events scheduled. Create your first event to get started!</p>
        </div>
      )}
    </div>
  );
}
