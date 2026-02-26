import pipeline from '@/brain/seeds/pipeline.json';

export default function PipelinePage() {
  const { stages, deals } = pipeline;

  const getDealsByStage = (stageId: string) => {
    return deals.filter(deal => deal.stage === stageId);
  };

  const getStageColor = (stageId: string) => {
    const colors: Record<string, string> = {
      new: 'border-blue-500 bg-blue-50',
      contacted: 'border-yellow-500 bg-yellow-50',
      scheduled: 'border-purple-500 bg-purple-50',
      proposal: 'border-orange-500 bg-orange-50',
      won: 'border-green-500 bg-green-50',
      lost: 'border-gray-500 bg-gray-50',
    };
    return colors[stageId] || 'border-gray-300 bg-gray-50';
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pipeline</h2>
          <p className="text-gray-500 mt-1">Track your deals through each stage</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Add Deal
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
          
          return (
            <div key={stage.id} className="flex-shrink-0 w-72">
              <div className={`rounded-t-lg border-t-4 ${getStageColor(stage.id)} px-4 py-3`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                  <span className="text-sm text-gray-500">{stageDeals.length}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">${totalValue.toLocaleString()}</p>
              </div>
              
              <div className="bg-gray-100 rounded-b-lg p-3 min-h-[400px]">
                {stageDeals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-200">
                    <h4 className="font-medium text-gray-900">{deal.name}</h4>
                    <p className="text-lg font-bold text-gray-900 mt-2">${deal.value.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-2">ID: {deal.id}</p>
                  </div>
                ))}
                
                {stageDeals.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-8">No deals</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
