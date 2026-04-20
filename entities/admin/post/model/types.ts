import { Avatar, UserBan } from "@/entities/admin/user";

export type ImagePost = {
  id: number | null;
  createdAt: string | null;
  url: string | null;
  width: number | null;
  height: number | null;
  fileSize: number | null;
};

export type PostOwnerModel = {
  id: number; // NON_NULL
  userName: string; // NON_NULL
  firstName: string | null;
  lastName: string | null;
  avatars: Avatar[];
};

export type Post = {
  id: number; // NON_NULL
  ownerId: number; // NON_NULL
  description: string; // NON_NULL
  createdAt: string; // NON_NULL
  updatedAt: string; // NON_NULL
  images: ImagePost[] | null;
  postOwner: PostOwnerModel; // NON_NULL
  userBan: UserBan | null; // nullable — используется в post-card для ban action
};

// PostsPaginationModel — cursor-based, нет поля page
// Не путать с UsersPaginationModel где page есть
export type PostsPaginationModel = {
  pagesCount: number;
  pageSize: number;
  totalCount: number; // нет page: number !
  items: Post[];
};
