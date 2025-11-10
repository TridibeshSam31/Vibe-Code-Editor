import {create} from "zustand"
import {toast} from "sonner"

import {TemplateFile,TemplateFolder} from "../lib/path-to-json"
import { generateFileId } from "../lib"


//we will first create a store for that since it's typescript so we will first define our interface/types 
//then we will use that create method that we defined on the top using that create we will create our hook we will get to methods in this set and get method in callback parameters
//now we will use this in any of our component 

interface OpenFile extends TemplateFile {
    id:string, //for uniquely identifying the template files
    hasUnsavedChanges:boolean,
    content:string,
    originalContent:string
}

interface FileExplorerState{
    playgroundId : string,
    templateData: TemplateFolder | null ,
    openFiles: OpenFile[],
    activeFileId:string | null ,
    editorContent: string,

// setter methods

    setPlaygroundId: (id:string) => void,
    setTemplateData: (data:TemplateFolder | null) => void ,
    setEditorContent: (content:string) => void ,
    setOpenFiles: (files:OpenFile[]) => void ,
    setActiveFileId: (fileId:string | null) => void 


 //Functions

 openFile: (file:TemplateFile) => void ;
 closeFile : (fileId:string) => void 
 closeAllFiles: () => void 



}

//using create method we will create our hook now 
//@ts-ignore
export const useFileExplorer = create<FileExplorerState>((set,get)=>({
    templateData : null ,
    playgroundId: "",
    openFiles:[] satisfies OpenFile[],
    activieField:null,
    editorContent: "",

    setTemplateData: (data) => set({templateData:data}),
    setPlaygroundId(id){
        set({playgroundId:id})
    },
    setEditorContent: (content) => set({editorContent:content}),
    setOpenFiles: (files) => set({openFiles:files}),
    setActiveFileId(fileId) {
        set({activeFileId:fileId})
    },

    openFile: (file)=>{
        //TO OPEN THE FILE WE NEED ??
        //fileId
        //openFiles
        //check existingfile
        //whether the fas has unsavedchanges or not that  will be in boolean form hasUnchangedChanges:false
        //save the current changes etc 

        const fileId = generateFileId(file,get().templateData!)
        const {openFiles} = get()
        const existingFile = openFiles.find((f)=>f.id === fileId)

        if (existingFile) {
            set({activeFileId:fileId , editorContent:existingFile.content})
            return
        }

        const newOpenFile:OpenFile = {
            ...file,
            id: fileId,
            hasUnsavedChanges: false ,
            content: file.content || "",
            originalContent: file.content || ""
        }

        set((state)=>({
            openFiles : [...state.openFiles , newOpenFile],
            activeFileId : fileId,
            editorContent:file.content || "" , 
        }))

        closeFile:(fileId)=>{
            const {openFiles , activeFileId} = get()
            const newFiles = openFiles.filter((f) => f.id !== fileId )

            //similar to vs code when we will close when file the tab should automatically switch to another tab for that writing the logic

            let newActiveFileId = activeFileId
            let newEditorContent = get().editorContent

            if (activeFileId === fileId) {
                if (newFiles.length > 0) {
                    const lastFile = newFiles[newFiles.length -1]
                    newActiveFileId = lastFile.id
                    newEditorContent = lastFile.content
                }else{
                    newActiveFileId = null 
                    newEditorContent = ""
                }
            }

            set({
                openFiles:newFiles,
                activeFileId:newActiveFileId,
                editorContent:newEditorContent
            })

        }


        closeAllFiles:() => {
            set({
                openFiles:[],
                activeFileId:null,
                editorContent:""
            })
        }
        
        
        
    }

}))