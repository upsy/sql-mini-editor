import { BPMEngine } from "@/types";

export function callBpmAjax(bpmEngine:BPMEngine, url:string, inputJSON:string, onLoad:(data:unknown)=>void, onError:(e:Error)=>void) {
    const createArgs = (inputJSON:string, onLoadDone:(data:unknown)=>void) => ({
        params: inputJSON,
        load: onLoadDone,
        error: (e:Error) => {console.log("service call failed: ", e); onError(e);}
    });
    
    const args = createArgs(inputJSON, onLoad);
    url = bpmEngine.appendSecurityContext(url);

    bpmEngine.callAjaxService(bpmEngine.rewriteURI(url), args);
}