import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Transition, Dialog } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { CameraIcon } from '@heroicons/react/outline'
import { db, storage } from '../firebase/client'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore'
import { signIn, signOut, useSession } from 'next-auth/react'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'
import { async } from '@firebase/util'



function Modal() {
    const [open, setOpen] = useRecoilState(modalState)
    const filePickerRef = useRef(null)
    const captionRef = useRef(null)
    const [file, setFile] = useState(null)
    const [loading, setLoadig] = useState(false)
    const { data: session } = useSession()

    const uploadPost = async () => {
        if (loading) return

        setLoadig(true);

        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: captionRef.current.value,
            profile: session.user.image,
            timestamp: serverTimestamp()
        });

        // console.log('upload', docRef.id)

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        await uploadString(imageRef, file, 'data_url').then(async snapshot => {
            const dowloadUrl = await getDownloadURL(imageRef)
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: dowloadUrl,
            })
        });

        setOpen(false)
        setLoadig(false)
        setFile(null)

    }


    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        };

        reader.onload = (readerEvent) => {
            setFile(readerEvent.target.result)
        };
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                onClose={setOpen}
            >
                <div className='flex items-end justify-center min-h-[800px] sm:min-h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>
                    <span className='hidden sm:inline-block sm:align-middle sm:h-screen' arial-hidden='true'>
                        &#8203
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:translate-y-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:translate-y-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>

                            <div>
                                {file
                                    ? (
                                        <img src={file} className='w-full object-contain cursor-pointer' onClick={() => setFile(null)} alt="" />
                                    ) : (
                                        <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
                                            <CameraIcon
                                                onClick={() => filePickerRef.current.click()}
                                                className='h-6 w-6 text-red-600' aria-hidden='true'
                                            />
                                        </div>
                                    )}

                                <div className='mt-3 text-center sm:mt-5'>
                                    <Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>Upload Photo</Dialog.Title>

                                    <div>
                                        <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
                                    </div>

                                    <div className='mt-2'>
                                        <input ref={captionRef} placeholder='Please enter a caption...' className='border-none focus:right-0 w-full text-center' type="text" />
                                    </div>

                                </div>

                            </div>


                            <div className='mt-5 sm:mt-6'>
                                <button
                                    onClick={uploadPost}
                                    disabled={!file}
                                    type='button'
                                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300'
                                >
                                    Upload Post
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
