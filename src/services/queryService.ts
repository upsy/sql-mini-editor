// src/services/queryService.ts
import { callBpmAjax } from '@/services/bpmService';
import { BPMEngine, TableSchema } from '@/types';
import { QueryHistoryItem, ServerResponse } from '@/types';
import { toast } from "sonner"



export const runQueryService = (bpmEngine:BPMEngine, url:string, newSqlQuery: string):Promise<{queryResults:Array<unknown>, savedQuery:QueryHistoryItem}> => {
    const inputObj = {
        "action": "RUN_QUERY",
        "payload": JSON.stringify({newSqlQuery: encodeURIComponent(newSqlQuery)})
    };

    const inputJSON = JSON.stringify(inputObj);

    const runQueryPromise :Promise<{queryResults:Array<unknown>, savedQuery:QueryHistoryItem}> = new Promise((resolve, reject) => {
        callBpmAjax( bpmEngine, url, inputJSON ,(data) => { 
                console.log(">> runQueryService", data);
                const serverResponse = data as ServerResponse;
                const resultsObj = JSON.parse(serverResponse.resultJSON);
                const savedQuery:QueryHistoryItem = resultsObj.savedQuery;
                savedQuery.query = decodeURIComponent(savedQuery.query);

                
                resolve({queryResults:resultsObj.queryResults, savedQuery:savedQuery}); 

            }, (error)=>{ reject(error); toast.error(error.message) } );
    });

    toast.promise(runQueryPromise, {
        loading: 'Running SQL query on server...',
        success: (data) => {
          return `Success! ${data.queryResults.length} row(s) returned`;
        },
        error: 'Error when running the query!',
      });

    return runQueryPromise;
};




export const fetchQueryHistoryService = (bpmEngine:BPMEngine, url:string):Promise<QueryHistoryItem[]> => {
    const inputObj = {
        "action": "FETCH_ALL_QUERIES",
        "payload": ''
    }
    const inputJSON = JSON.stringify(inputObj);

    return new Promise((resolve, reject) => {
        callBpmAjax( bpmEngine, url, inputJSON ,(data) => { 
                console.log(">> fetchQueryHistoryService", data);

                const serverResponse = data as ServerResponse;
                const resultsObj = JSON.parse(serverResponse.resultJSON);
                let allQueries = [];
                if (resultsObj && resultsObj.allQueries){
                    allQueries = resultsObj.allQueries
                }

                resolve(allQueries as QueryHistoryItem[]); 
            }, 
            (error)=>{ reject(error) } );
  });
};


export const fetchDbSchemaService = (bpmEngine:BPMEngine, url:string):Promise<TableSchema[]> => {
    const inputObj = {
        "action": "FETCH_DB_SCHEMA",
        "payload": ''
    }
    const inputJSON = JSON.stringify(inputObj);

    const fetchDbSchemaService:Promise<TableSchema[]> =  new Promise((resolve, reject) => {
        callBpmAjax( bpmEngine, url, inputJSON ,(data) => { 
                console.log(">> fetchDbSchemaService", data);

                const serverResponse = data as ServerResponse;
                const resultsObj = JSON.parse(serverResponse.resultJSON);
                let dbSchema = [];
                if (resultsObj && resultsObj.dbSchema){
                    dbSchema = resultsObj.dbSchema
                }

                resolve(dbSchema as TableSchema[]); 
            }, 
            (error)=>{ reject(error) } );
  });


  toast.promise(fetchDbSchemaService, {
    loading: 'Retrieving DB Schema configurations...',
    success: () => {
      return `Success! Dashboard Initialized!`;
    },
    error: 'Error!',
  });

  return fetchDbSchemaService;
};