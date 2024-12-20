export interface CreateBlogParams {
  base64CoverImage: string;
  coverImageName: string;
  coverImageType: string;
  title: string;
  tags: { label: string; value: string }[];
  content: string;
}

export interface UpdateBlogCoverParams {
  slug: string;
  base64CoverImage: string;
  coverImageName: string;
  coverImageType: string;
}