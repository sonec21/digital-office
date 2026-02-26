import pipeline from '@/brain/seeds/pipeline.json';

export default function PipelinePage() {
  const { stages, deals } = pipeline;

  const getDealsByStage = (stageId: string) => {
    return deals.filter(deal => deal.stage === stageId);
  };

  const getStageColor = (stageId: string) => {
    const colors: Record<string, string> = {
      new: 'border-blue-500 bg-blue-50/50',
      contacted: 'border-amber-500 bg-amber-50/50',
      scheduled: 'border-violet-500 bg-violet-50/50',
      proposal: 'border-orange-500 bg-orange-50/50',
      won: 'border-emerald-500 bg-emerald-50/50',
      lost: 'border-slate-400 bg-slate-50/50',
    };
    return colors[stageId] || 'border-slate-300 bg-slate-50';
  };

  return (
    <div className="p-8 h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pipeline</h2>
          <p className="text-sm text-slate-500 mt-1">Track your deals through each stage</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          + Add Deal
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
          
          return (
            <div key={stage.id} className="flex-shrink-0 w-72 flex flex-col max-h-full">
              {/* Stage Header */}
              <div className={`rounded-t-lg border-t-4 ${getStageColor(stage.id)} px-4 py-3 flex-shrink-0`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-sm">{stage.name}</h3>
                  <span className="text-xs font-medium text-slate-500 bg-white/60 px-2 py-0.5 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">${totalValue.toLocaleString()}</p>
              </div>
              
              {/* Deals Container */}
              <div className="bg-slate-100/80 rounded-b-lg p-2 flex-1 overflow-y-auto min-h-[300px]">
                {stageDeals.map((deal) => (
                  <div 
                    key={deal.id} 
                    className="bg-white rounded-lg shadow-sm border border-slate-200 p-3 mb-2 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <h4 className="font-medium text-slate-900 text-sm leading-snug">{deal.name}</h4>
                    <p className="text-lg font-bold text-slate-900 mt-2">${deal.value.toLocaleString()}</p>
                    <p className="text-xs text-slate-400 mt-2">ID: {deal.id}</p>
                  </div>
                ))}
                
                {stageDeals.length === 0 && (
                  <div className="flex items-center justify-center h-24 text-xs text-slate-400">
                    No deals
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
