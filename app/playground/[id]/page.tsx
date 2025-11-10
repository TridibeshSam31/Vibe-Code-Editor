"use client"
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TemplateFileTree } from '@/modules/playground/components/playground-explorer';
import { useFileExplorer } from '@/modules/playground/hooks/useFileExplorer';
import { usePlayground } from '@/modules/playground/hooks/usePlayground';
import { useParams } from 'next/navigation'
import React, { useEffect }  from 'react'
import { TemplateFile } from '@/modules/playground/lib/path-to-json';
import { Button } from '@/components/ui/button';
import { Bot, Save, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const MainPlaygroundPage = () => {
    const {id} = useParams<{id:string}>();
    const [isPreviewVisible , setIsPreviewVisible] = useState(false)

    const {playgroundData,isLoading,templateData,error,saveTemplateData} = usePlayground(id)
     
    const {activeFileId , closeAllFiles, openFile , openFiles , setTemplateData ,  setPlaygroundId , setActiveFileId } = useFileExplorer()

    useEffect(()=>{setPlaygroundId(id)},[id,setPlaygroundId])

    useEffect(()=>{
      if (templateData&& !openFiles.length) {
        setTemplateData(templateData)
        
      }
    },[templateData,setTemplateData,openFiles.length])
    //for checking purpose 
    console.log("templateData",templateData)
    console.log("playgroundData",playgroundData)
  //ui for file exploration
   const activeFile = openFiles.find((file)=>file.id === activeFileId)
   const hasUnsavedChanges = openFiles.some((file)=>file.hasUnsavedChanges)
   

   const handleFileSelect = (file:TemplateFile) => {
    openFile(file)
   }
    
   

  return (
        <TooltipProvider>
            <>
            <TemplateFileTree
            data={templateData!}
            onFileSelect={handleFileSelect}
            selectedFile={activeFile}
            title="File Explorer"
            onAddFile={()=>{}}
            onAddFolder={()=>{}}
            onDeleteFolder={()=>{}}
            onRenameFile={()=>{}}
            onRenameFolder={()=>{}}
            
            />
            <SidebarInset>
              <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
                <SidebarTrigger className='-ml-1'/>
                <Separator orientation='vertical' className='mr-2 h-4'/>

                <div className='flex flex-1 items-center gap-2'>
                <div className='flex flex-col flex-1'>
                  <h1 className='text-sm font-medium '>
                    {playgroundData?.title||"code Playground"}
                  </h1>
                  <p className='text-xs text-muted-foreground'>
                    {openFiles.length} Files(s) open
                    {hasUnsavedChanges && " . Unsaved Changes"}
                  </p>

                </div>


                <div className='flex items-center gap-1'>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button size="sm" variant="outline" onClick={() => {}} disabled={!activeFile || !activeFile.hasUnsavedChanges}>
                        <Save className='h-4 w-4'/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Save (Ctrl+S) </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => {}} disabled={!hasUnsavedChanges}>
                        <Save className='h-4 w-4'/> All
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Save All (Ctrl+Shift+S) </TooltipContent>
                  </Tooltip>

                  <Button variant={"default"} size={"icon"}>
                    <Bot className='size-4' />
                  </Button>
                  <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                    >
                      {isPreviewVisible ? "Hide" : "Show"} Preview
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={closeAllFiles}>
                      Close All Files
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
              </div>

              </header>
              <div className='h-[calc(100vh-4rem)]'>
                {
                  openFiles.length > 0 ? ()
                }

              </div>
              
            </SidebarInset>



            </>
        </TooltipProvider>
  )
}

export default MainPlaygroundPage



//iss params id se kya hoga ?
/*

The code defines a React component called MainPlaygroundPage that uses the useParams hook from Next.js to extract the id parameter from the URL. When this component is rendered, it will display the text "params : " followed by the value of the id parameter.
next we need to select the template and then convert it to the json format and then we can use it in playground





*/