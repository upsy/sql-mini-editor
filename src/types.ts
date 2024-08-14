export type BPMEngine = {
        appendSecurityContext : (url:string)=>string,
        callAjaxService: (url:string, args:{params:string, load:(data:unknown)=>void, error: (e:Error)=>void})=>void,
        rewriteURI: (url:string)=>string
}