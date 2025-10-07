import React from 'react'
import AddNewButton from '@/modules/dashboard/components/add-new'
import AddRepo from '@/modules/dashboard/components/add-new-repo'
import {getAllPlaygroundForUser} from '@/modules/dashboard/actions'
import ProjectTable from '@/modules/dashboard/components/project-table'
import EmptyState from '@/modules/dashboard/components/empty-state'





const page = async() => {
    const playgrounds = await getAllPlaygroundForUser()
  return (
    <div className='flex flex-col justify-center items-center min-h-screen mx-auto max-w-7xl px-4 py-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
            <AddNewButton/>
            <AddRepo/>
        </div>
        <div className='mt-10 flex flex-col justify-center items-center w-full'>
             {playgrounds && playgrounds.length === 0 ? (
          <EmptyState />
        ) : (
          <ProjectTable
            projects={playgrounds || []}
            onDeleteProject={deleteProjectById}
            onUpdateProject={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )}

        </div>
    </div>
  )
}

export default page