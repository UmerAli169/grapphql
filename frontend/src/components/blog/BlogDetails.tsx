import { useRouter } from "next/router";
import data from '../../Data/blog/blogdetails.json';

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const blogPost = data.blogs.find((post:any) => post.id === id);

  if (!blogPost) {
    return <p className="text-center text-red-500">Blog not found</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
      <p className="text-gray-600 mb-4">{blogPost.date}</p>
      <img src={blogPost.image} alt={blogPost.title} className="w-full h-auto max-h-[500px] object-cover mb-6" />
      <p className="text-lg text-gray-800">{blogPost.description}</p>
    </div>
  );
};

export default BlogDetails;
