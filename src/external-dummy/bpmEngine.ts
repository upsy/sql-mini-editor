import { BPMEngine } from "@/types";

export const bpmEngine:BPMEngine = {
    appendSecurityContext : (url:string)=>url,
    rewriteURI: (url:string)=>url,
    callAjaxService: (url:string, args:{params:string, load:(data:unknown)=>void, error: (e:Error)=>void})=>{
        console.log(">> callAjaxService", url, args);

        const inputObj = JSON.parse(args.params);
        let serverData:unknown;

        if (inputObj.action == 'RUN_QUERY'){
            serverData={
                message:"Query run succesfully!",
                ok:true,
                resultJSON:`{"queryResults":[{"id":1, "name":"Drago,s","created_d":"2024-05-01"},{"id":2, "name":"M'aria"}], "savedQuery":{"query":"${JSON.parse(inputObj.payload).newSqlQuery}", "created_d":"2024-08-16", "user_id":"diatan"}}`,
                

            }
        }

        if (inputObj.action == 'FETCH_ALL_QUERIES'){
            serverData={
                message:"Historical queries retrieved!",
                ok:true,
                resultJSON:'{"allQueries":[{"query": "select * from users", "created_d":"2024-08-14", "user_id":"diatan"}]}'
                
            }
        }

        setTimeout(()=>{
            console.log(">> serving ", serverData);
            args.load(serverData);
        }, 500)
    }
}