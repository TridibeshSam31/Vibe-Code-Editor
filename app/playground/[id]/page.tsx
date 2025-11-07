"use client"
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { usePlayground } from '@/modules/playground/hooks/usePlayground';
import { useParams } from 'next/navigation'
import React from 'react'

const MainPlaygroundPage = () => {
    const {id} = useParams<{id:string}>();

    const {playgroundData,isLoading,templateData,error,saveTemplateData} = usePlayground(id)
     
    //for checking purpose 
    console.log("templateData",templateData)
    console.log("playgroundData",playgroundData)
  //ui for file exploration
  return (
        <TooltipProvider>
            <>
            <TemplateFileTree
            data={templateData}
            onFileSelect={()=>{}}
            selectedFile={()=>{}}
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

              </header>
              <div className='flex flex-1 items-center gap-2'>
                <div className='flex flex-col flex-1'>
                  <h1 className='text-sm font-medium '>
                    {playgroundData?.title||"code Playground"}
                  </h1>

                </div>
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