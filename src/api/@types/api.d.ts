type UserDto = {
    name: string;
    surname: string;
    email: string;
    password: string;
};

export type UpdatePasswordUser = {
    user: UserDto;
    newPassword: string;
    id: string;
};

export type UpdateDataUser = {
    user: UserDto;
    id: string;
};

type PublicationDto = {
    category: string;
    title: string;
    text: string;
    userId: string;
};

type CreatePublicationDto = {
    category: string;
    title: string;
    text: string;
};

type Publication = {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    category: string;
    title: string;
    text: string;
    userId: string;
};

type CommentDto = {
    text: string;
    userId: string;
    publicationId: string;
};

type Comment = {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    text: string;
    userId: string;
    publicationId: string;
};

type AuthToken = {
    access_token: string;
};
