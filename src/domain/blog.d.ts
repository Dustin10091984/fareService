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
}

interface BlogComment{

}