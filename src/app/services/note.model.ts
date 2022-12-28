
enum Colors {
    yellow = 'yellow',
    green = 'green',
    blue = 'blue',
    red = 'red'
}

type Note = {
    uid?: string;
    title: string;
    content: string;
    date: string;
    updatedAt: string;
    color: Colors;
    isPinned: boolean;
}

export { Note, Colors }