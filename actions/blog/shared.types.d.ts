export interface CreateBlogParams {
  coverImage: string;
  title: string;
  tags: { label: string; value: string }[];
  content: string;
}
