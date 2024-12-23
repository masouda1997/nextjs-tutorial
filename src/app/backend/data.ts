
export interface IFakeCommentData {
    id: string |number,
    postId:string |number,
    author: string,
    email:string,
    content:string,
    createdAt:string
}

export const FakeCommentData:IFakeCommentData[] = [
    {
      "id": 1,
      "postId": 101,
      "author": "John Doe",
      "email": "john.doe@example.com",
      "content": "This is a fantastic post! Really enjoyed reading it.",
      "createdAt": "2024-12-23T08:30:00Z"
    },
    {
      "id": 2,
      "postId": 101,
      "author": "Jane Smith",
      "email": "jane.smith@example.com",
      "content": "I agree with John. This is very insightful!",
      "createdAt": "2024-12-23T09:15:00Z"
    },
    {
      "id": 3,
      "postId": 102,
      "author": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "content": "Could you elaborate more on this topic? I'm curious to learn more.",
      "createdAt": "2024-12-22T18:45:00Z"
    },
    {
      "id": 4,
      "postId": 103,
      "author": "Bob Brown",
      "email": "bob.brown@example.com",
      "content": "I found this article confusing. Could you clarify a few points?",
      "createdAt": "2024-12-21T14:20:00Z"
    },
    {
      "id": 5,
      "postId": 101,
      "author": "Charlie Green",
      "email": "charlie.green@example.com",
      "content": "Thanks for sharing this information!",
      "createdAt": "2024-12-23T10:00:00Z"
    }
  ]