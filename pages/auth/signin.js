import { getProviders, signIn } from 'next-auth/react'
import Header from '../../components/Header'
import Head from 'next/head'


function signin({ providers }) {
    return (
        <>
            <Head>
                <title>Iniciar Sesion | Instagram Clone</title>
                <meta name="description" content="Instagram clone whit AlexisPavon010" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <div className='flex flex-col items-center justify-center min-h-screen'>
                <img className='w-80' src="https://links.papareact.com/ocw" alt="" />
                <img className='w-40' src="https://links.papareact.com/jjm" alt="" />

                <div className='mt-10'>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className='p-3 w-80 bg-blue-500 text-white rounded-lg' onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: {
            providers
        }
    }
}

export default signin
