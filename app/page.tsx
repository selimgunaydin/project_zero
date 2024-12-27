import { getBlogs } from "./actions/blog/get-blogs";
import AddBlog from "./components/views/add-blog";

export default async function Home() {
  const blogs = await getBlogs().then((res) => res.success);
console.log(blogs);
  return (
    <main>
      <div className="w-full flex flex-col items-center justify-center py-4">
        <AddBlog />
        <div>
          <h1 className="text-2xl font-bold text-center">
            Welcome to the Blog App
          </h1>
          <div className="flex flex-wrap justify-center">
            {blogs?.map((blog) => (
              <div key={blog._id} className="w-1/3 p-4">
                
                <div className="bg-white shadow-md p-4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <h2 className="text-lg font-bold mt-4">{blog.title}</h2>
                  <p className="text-sm text-gray-600">{blog.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
