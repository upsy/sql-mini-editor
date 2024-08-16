// src/hooks/useQueryHistory.ts
import { useQuery } from '@tanstack/react-query';
// import { useDashboardStore } from '@/store/dashboardStore';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { fetchQueryHistoryService } from '@/services/queryService';


export const useQueryHistory = () => {
  const { bpmEngine, url } = useDashboardContext();
//   const { setQueryHistory } = useDashboardStore();

  return useQuery({
    queryKey: ['queryHistory'],
    queryFn: () => fetchQueryHistoryService(bpmEngine, url),
    staleTime: Infinity, // Prevent automatic refetching
  });
};