// import { BlogListPage } from "../components/BlogListPage";
import Navbar from "../components/NavBar";
import UnderConstructionOverlay from "../components/UnderConstructionOverlay";

// const posts = [
//   {
//     id: "1",
//     title: "Sample Blog Post",
//     content: [
//       {
//         blockId: "123",
//         text: "This is a sample blog post content.",
//         type: "paragraph",
//       },
//     ],
//   },
// ];

async function Page() {
  return (
    <UnderConstructionOverlay
      title="Blog"
      description="This section is currently under development."
    />
  );

  return (
    <div className="pt-24">
      <Navbar />
      <div className="p-2">
        {/* <BlogListPage posts={posts} /> */}
      </div>
    </div>
  );
}

export default Page;
