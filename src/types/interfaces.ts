
export  interface registerData {
    name: string;
    email: string;
    password: string;
}

export  interface loginData {
    email: string;
    password: string;
}

export interface BlogCardProps {
    userName: string;
    title: string;
    imageUrl: string;
    content: string;
    blogId: string;
    onUpdate?: any;
    isAuthor?: boolean;
}

export interface EditBlogFormProps {
    blogData: {
      title: string;
      description: string;
      imageUrl: string;
    };
    onClose: () => void;
    onSubmit: (values: { title: string, description: string, image: File | null }) => void;
}