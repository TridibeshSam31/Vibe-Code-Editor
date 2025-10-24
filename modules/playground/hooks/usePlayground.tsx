import {useState,useEffect,useCallback} from "react"
import { toast } from "sonner"

import type { TemplateFolder } from "../lib/path-to-json"

interface PlaygroundData {
    id:string,
    name?:string,
    [key:string]:any

}

interface usePlaygroundReturn {
    playgroundData:PlaygroundData | null,
    templateData:TemplateFolder | null,
    isLoading:boolean,
    error:string | null
    loadPlayground:()=>Promise<void>;//in this method we will pas the id and then get the backend for us 
    saveTemplateData:(data:TemplateFolder)=>Promise<void>;//we need this to save the template to the database so thet we don't have to render it again and again 

}


export const usePlayground = (id:string):usePlaygroundReturn=>{
const [playgroundData,setPlaygroundData] = useState<PlaygroundData |null>(null);
const [templateData,setTemplateData] = useState<TemplateFolder | null>(null);
const [isLoading,setIsLoading] = useState<boolean>(false);
const [error,setError] = useState<string | null>(null);

const loadPlayground = async ()=>{
    setIsLoading(true);
    try {
        const response = await fetch(`/api/playground/${id}`);
        const data = await response.json();
        setPlaygroundData(data);
    } catch (error) {
        setError("Failed to load playground");
    } finally {
        setIsLoading(false);
    }
}

const saveTemplateData = async (data:TemplateFolder)=>{
    try {
        await fetch(`/api/playground/${id}/template`,{
            method:"POST",
            body:JSON.stringify(data)
        });
    } catch (error) {
        setError("Failed to save template");
    }
}

return {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData
}
}