// src/services/queryService.ts
import { callBpmAjax } from '@/services/bpmService';
import { BPMEngine } from '@/types';
import { QueryHistoryItem, ServerResponse } from '@/types';



export const runQueryService = (bpmEngine:BPMEngine, url:string, newSqlQuery: string):Promise<{queryResults:Array<unknown>, savedQuery:QueryHistoryItem}> => {
    const inputObj = {
        "action": "RUN_QUERY",
        "payload": JSON.stringify({newSqlQuery: encodeURIComponent(newSqlQuery)})
    };

    const inputJSON = JSON.stringify(inputObj);

    return new Promise((resolve, reject) => {
        callBpmAjax( bpmEngine, url, inputJSON ,(data) => { 
                console.log(">> runQueryService", data);
                const serverResponse = data as ServerResponse;
                const resultsObj = JSON.parse(serverResponse.resultJSON);
                const savedQuery:QueryHistoryItem = resultsObj.savedQuery;
                savedQuery.query = decodeURIComponent(savedQuery.query);
                resolve({queryResults:resultsObj.queryResults, savedQuery:savedQuery}); 

            }, (error)=>{ reject(error) } );
    });
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