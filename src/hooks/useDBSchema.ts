// src/hooks/useQueryHistory.ts
import { useQuery } from '@tanstack/react-query';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { fetchDbSchemaService } from '@/services/queryService';


export const useDbSchema = () => {
  const { bpmEngine, url } = useDashboardContext();
//   const { setQueryHistory } = useDashboardStore();

  return useQuery({
    queryKey: ['dbSchema'],
    queryFn: () => fetchDbSchemaService(bpmEngine, url),
    staleTime: Infinity, // Prevent automatic refetching
  });
};