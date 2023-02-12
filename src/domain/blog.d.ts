interface BlogCategory{
  id: number;
  name: string;
  image?: string;
}

interface Blog{
  id: number;
  title: string;
  slug: string;
  category: BlogCategory;
  lastest_comment?: BlogComment;
  created_at: string;
  featured_image: string;
  author?: string;
  contents: BlogContent[],
}
interface BlogDetail extends Blog {
  commets: BlogComment[];
}
interface BlogContent{
  id: number;
  content: string;
  image: string;
}
interface BlogComment{
  id: number;
  comment_id: number | null;
  comment: string;
  replies: BlogComment[];
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
    image: string | null;
  }
}