import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/client'
import Post from './Post'

function Posts() {

    const [posts, setPost] = useState([])

    useEffect(() => {
     return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
        setPost(snapshot.docs)
      })
  
    }, [])

    // console.log(posts)

    return (
        <div>
            {posts?.map((post) => 
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.data().username}
                    userImg={post.data().profile}
                    img={post.data().image}
                    caption={post.data().caption}

                 />
            )}
        </div>
    )
}

export default Posts
