// src/hooks/useRunQuery.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDashboardStore } from '@/store/dashboardStore';
import { runQueryService } from '@/services/queryService';
import { useDashboardContext } from '@/contexts/DashboardContext';

export const useRunQuery = () => {
  const queryClient = useQueryClient();
  const { queryHistory, addToQueryHistory, setCurrentQuery } = useDashboardStore();
  const { bpmEngine, url } = useDashboardContext();

  return useMutation({
    mutationFn: (query: string) => runQueryService(bpmEngine, url, query),
    onSuccess: (data, variables) => {
      
      debugger;

      console.log('>> run query ednded', data, variables, queryHistory);

      queryClient.setQueryData(['queryResults'], data);
      addToQueryHistory({query:variables, created_d:'2024-08-14', user_id:'@you'});
      setCurrentQuery(variables);  // Update current query in store
    },
    onError: (error) => {
      console.error('Query failed:', error);
      queryClient.setQueryData(['queryResults'], null);
    },
  });
};