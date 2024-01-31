
export const paths = {
    home() {
        return '/'
    },
    showFolder(folderId: string) {
        return `/home?id=${folderId}`
    },
    showNote(noteId: string, folderId: string) {
        return `/home?id=${folderId}&note=${noteId}`
    },
    showTag(tagId: string) {
        return `/home?tagId=${tagId}`
    },
    showNoteTag(tagId: string, noteId: string) {
        return `/home?tagId=${tagId}&note=${noteId}`
    }
}
