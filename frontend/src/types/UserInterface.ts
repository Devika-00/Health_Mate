export type UserInterface = {
    _id: string;
    name: string;
    email: string;
    profilePicture?: string;
    phoneNumber?:number;
    role: "user";
    age?:number,
    gender:string,
    isVerified: boolean;
    isBlocked: boolean;
    bookmarks?: string[];
    createdAt: Date;
  };