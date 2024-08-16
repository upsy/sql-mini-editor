export type BPMEngine = {
        appendSecurityContext : (url:string)=>string,
        callAjaxService: (url:string, args:{params:string, load:(data:unknown)=>void, error: (e:Error)=>void})=>void,
        rewriteURI: (url:string)=>string
}

export type ServerResponse = {
        ok: boolean;
        message: string;
        resultJSON : string;
}

export type QueryHistoryItem = {
        query: string;
        created_d: string;
        user_id: string;
    }