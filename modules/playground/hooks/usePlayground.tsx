import {useState,useEffect,useCallback} from "react"


import type { TemplateFolder } from "../lib/path-to-json"
import { getPlaygroundById, SaveUpdatedCode } from "../actions"
import { toast } from "sonner"

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

const loadPlayground = useCallback(async ()=>{
    if(!id) return

    try {
     setIsLoading(true)
     setError(null)
     
     const data = await getPlaygroundById(id)
     // @ts-ignore
     setPlaygroundData(data);
     const rawContent = data?.templateFiles?.[0]?.content

     if (typeof rawContent === "string") {
        const parsedContent = JSON.parse(rawContent)
        setTemplateData(parsedContent)
        toast.success("playground loaded successfully")
        return
     }

     //load template from api if not in saved content

     const res = await fetch(`/api/template/${id}`)

     if(!res.ok) throw new Error(`Failed to load template: ${res.status}`)
        const  templateRes = await res.json()
    if(templateRes.templateJson && Array.isArray(templateRes.templateJson)){
        setTemplateData({
            folderName:"Root",
            items:templateRes.templateJson
        })
    }else{
        setTemplateData(templateRes.templateJson || {
            folderName:"Root",
            items:[]

        })
    }
    toast.success("Templatr loaded successfully")

    } catch (error) {
        console.error("Error loading playground",error)
        setError("Failed to load playground data")
        toast.error("failed to load playground data")
    } finally{
        setIsLoading(false)
    }
},[id])

const saveTemplateData = useCallback(async(data:TemplateFolder)=>{
    try {
        await SaveUpdatedCode(id,data)
        setTemplateData(data)
        toast.success("changes saved successfully")
    } catch (error) {
        console.error("Error Sving Template data :",error)
        toast.error("Failed to save changes")
        throw error 
    }

},[id])

useEffect(()=>{
    loadPlayground()
},[loadPlayground])


return {
    playgroundData,
    templateData,
    isLoading,
    error,
    loadPlayground,
    saveTemplateData
}

}
