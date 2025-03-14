import React, {useState, useEffect} from 'react'
import dataServices from "../appwrite/Data";
import { PostCard, Container } from "../components";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        dataServices.getActivePosts([]).then((response) => {
            setPosts(response.documents);
        });
    }, []);

  return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
        </Container>
     </div>
  )
}

export default AllPosts

