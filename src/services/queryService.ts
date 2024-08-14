// src/services/queryService.ts
import { callBpmAjax } from '@/services/bpmService';
import { BPMEngine } from '@/types';

export const runQueryService = (bpmEngine:BPMEngine, url:string, newSqlQuery: string) => {
    const inputObj = {
        "action": "RUN_QUERY",
        "payload": JSON.stringify({newSqlQuery})
    };
    
    const inputJSON = JSON.stringify(inputObj);

    return new Promise((resolve, reject) => {
        callBpmAjax( bpmEngine, url, inputJSON ,(data) => { resolve(data); }, (error)=>{ reject(error) } );
    });
};

export const fetchQueryHistoryService = (bpmEngine:BPMEngine, url:string) => {
    const inputObj = {
        "action": "FETCH_ALL_QUERIES",
        "payload": ''
    }
    const inputJSON = JSON.stringify(inputObj);

    return new Promise((resolve, reject) => {
    callBpmAjax( bpmEngine, url, inputJSON ,(data) => { resolve(data); }, (error)=>{ reject(error) } );
  });
};