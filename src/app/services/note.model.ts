type Note = {
    uid?: string;
    title: string;
    content: string;
    date: string;
    updatedAt: string;
    color: 'yellow' | 'green' | 'blue' | 'red';
    isPinned: boolean;
}

export { Note };