

export interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    categories?: string[];
    publisher?: string;
    authors: string[];
    description: string;
    infoLink: string;
    imageLinks?: {
      thumbnail?: string;
    }
    publishedDate: string;
  }
}

export interface SavedBooks {
    title: string
    authors: string
    image: string
    bookId: number
    description: string
    comments?: Comments[]
}

export interface Comments {
    content: string
    commentId: number
    createdAt: string
    user: {
      username?: string
      userId?: number
      firstName?: string
      lastName?: string
    }
}