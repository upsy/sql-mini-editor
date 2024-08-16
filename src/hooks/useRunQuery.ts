// src/hooks/useRunQuery.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDashboardStore } from '@/store/dashboardStore';
import { runQueryService } from '@/services/queryService';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { QueryHistoryItem } from '@/types';


export const useRunQuery = () => {
  const queryClient = useQueryClient();
  const { setCurrentQuery } = useDashboardStore();
  const { bpmEngine, url } = useDashboardContext();

  return useMutation({
    mutationFn: (query: string) => runQueryService(bpmEngine, url, query),
    onSuccess: (data, variables) => {
      

      console.log('>> run query ednded', data, variables);



      queryClient.setQueryData(['queryResults'], data.queryResults);
      // addToQueryHistory({query:variables, created_d:'2024-08-14', user_id:'@you'});
      setCurrentQuery(variables);  // Update current query in store
      queryClient.setQueryData(['queryHistory'],(oldData:Array<QueryHistoryItem>)=>[data.savedQuery, ...oldData]);
    },
    onError: (error) => {
      console.error('Query failed:', error);
      queryClient.setQueryData(['queryResults'], null);
    },
  });
};