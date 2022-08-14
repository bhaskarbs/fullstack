import { Navbar } from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/CreateUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{data}] = usePostsQuery()
  return (
  <>
    <Navbar />
    <div>Hello World</div>
    {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
  </>
)}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index) 
