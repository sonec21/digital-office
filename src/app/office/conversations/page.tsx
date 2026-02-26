'use client';

import conversations from '@/brain/seeds/conversations.json';

export default function ConversationsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Conversations</h2>
          <p className="text-sm text-slate-500 mt-1">Recent messages and chats</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {conversations.map((conv) => (
            <div key={conv.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {conv.contact.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-slate-900">{conv.contact}</h3>
                      {conv.unread && (
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 truncate max-w-md">{conv.last_message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">
                    {new Date(conv.timestamp).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{conv.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {conversations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No conversations yet</p>
        </div>
      )}
    </div>
  );
}
