export const dynamic = 'force-dynamic';

import Confirm from "@/components/Confirm";
import FoldersForm from "@/components/Folders_Form";
import FoldersLists from "@/components/Folders_Lists";
import { getFolders } from "@/helpers/get_folders";

interface Folder {
    id: string
    name: string
    createdAt: string
}

export default async function Folder() {
    const folders: Folder[] = await getFolders()

    return (
        <main className="flex flex-col gap-y-4">
            <FoldersForm />
            <Confirm title="Delete all folders?" func="CLEAR_FOLDERS" />
            <FoldersLists folders={folders} />
        </main>
    )
}