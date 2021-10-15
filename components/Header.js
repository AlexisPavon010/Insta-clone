import Image from 'next/image'
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    HomeIcon
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

export default function Header() {

    const { data: session } = useSession()
    const router = useRouter()
    const [open, setOpen] = useRecoilState(modalState)

    return (
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between max-w-6xl mx-5 xl:mx-auto'>
                <div className='relative hidden lg:inline-grid w-24 cursor-pointer'>
                    <Image
                        onClick={() => router.push('/')}
                        layout='fill'
                        objectFit='contain'
                        src='https://links.papareact.com/ocw'
                    />
                </div>
                <div className='relative w-10 lg:hidden flex-shrink-0 cursor-pointer'>
                    <Image
                        onClick={() => router.push('/')}
                        layout='fill'
                        objectFit='contain'
                        src='https://links.papareact.com/jjm'
                    />
                </div>
                <div className='max-w-xs'>
                    <div className='relative mt-1 p-3 rounded-md'>
                        <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-500' />
                        </div>
                        <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md' type="text" placeholder='Search...' />
                    </div>
                </div>
                <div className='flex items-center justify-end space-x-4'>
                    <HomeIcon onClick={() => router.push('/')} className='navBtn' />
                    <MenuIcon className='h-6 md:hidden cursor-pointer' />

                    {session
                        ? (
                            <>
                                <div className='relative navBtn'>
                                    <PaperAirplaneIcon className='navBtn rotate-45' />
                                    <div className='absolute -top-1 -right-2 text-xs text-white w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse'>3</div>
                                </div>
                                <PlusCircleIcon onClick={()=> setOpen(true)} className='navBtn' />
                                <UserGroupIcon className='navBtn' />
                                <HeartIcon className='navBtn' />
                                <img
                                    onClick={signOut}
                                    className='h-10 rounded-full cursor-pointer'
                                    layout='fill'
                                    src={session?.user?.image}
                                />
                            </>
                        ) : (
                            <button className='text-blue-400 font-semibold' onClick={signIn}>Iniciar</button>
                        )}


                </div>
            </div>
        </div>
    )
}
