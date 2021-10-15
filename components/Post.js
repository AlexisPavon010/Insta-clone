import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore'
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon, 
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase/client'
import Moment from 'react-moment'


function Post({ id, username, userImg, img, caption }) {

    const { data: session } = useSession()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLikes, setHasLikes] = useState(false)


    useEffect(() => {
        return setHasLikes(likes.findIndex((like) => (like.id === session?.user.uid)) !== -1)
    }, [likes])



    useEffect(() => {
        return onSnapshot(
            query(
                collection(db, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')
            ),
            (snapshot) => setComments(snapshot.docs)
        )
    }, [db])

    useEffect(() => {
        return onSnapshot(
            query(
                collection(db, 'posts', id, 'likes'),
            ),
            (snapshot) => setLikes(snapshot.docs)
        )
    }, [db])

    const addLikes = async () => {
        if (hasLikes) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        }
        else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username,
            })
        }
    }

    const sendComments = async (e) => {
        e.preventDefault()


        const commentToSend = comment
        setComment('')

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()
        })

    }

    return (
        <div className='bg-white my-7 border rounded-sm'>
            <div className='flex items-center p-5 '>
                <img className='rounded-full h-12 w-12 object-contain border p-1 mr-3 ' src={userImg} alt="" />
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5 text-gray-700' />
            </div>
            <img className='w-full object-cover' src={img} alt="" />
            <div className='flex justify-between pt-4 px-4'>
                <div className="flex space-x-4">
                    {hasLikes ?
                       ( <HeartIconFilled onClick={addLikes} className='btn text-red-500' />)
                        :
                        (<HeartIcon onClick={addLikes} className='btn' />)
                    }
                    <ChatIcon className='btn' />
                    <PaperAirplaneIcon className='btn' />
                </div>
                <BookmarkIcon className='btn' />
            </div>

            <p className='p-5 truncate'>
                {likes.length > 0 && (
                    <p className='font-bold mb-1'>{likes.length} likes</p>
                )}
                <span className='font-bold mr-1'>{username}</span>
                {caption}
            </p>

            {
                comments.length > 0 && (
                    <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                        {comments.map((comment) => (
                            <div className='flex items-center space-x-2 mb-3' key={comment.id}>
                                <img className='h-7 rounded-full' src={comment.data().userImage} alt="" />
                                <p className='text-sm flex-1'>
                                    <span className='font-bold'>{comment.data().username} </span>
                                    {''}
                                    {comment.data().comment}
                                </p>
                                <Moment fromNow className='pr-5 text-xs'>
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                            </div>
                        ))}
                    </div>
                )
            }

            {session && (
                <form className='flex items-center p-4'>
                    <EmojiHappyIcon className='h-7' />
                    <input value={comment} type="text" onChange={e => setComment(e.target.value)} placeholder='añadir un comentario' className='border-none flex-1 focus:ring-0 outline-none' />
                    <button type='submit' disabled={!comment.trim()} onClick={sendComments} className='font-semibold text-blue-400'>Comentar</button>
                </form>
            )}
        </div>
    )
}

export default Post
