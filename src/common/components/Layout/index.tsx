import React from 'react'
// Components
import Header from './Header'
import Footer from './Footer'

type Props = {
    children: React.ReactNode
}

const index = ({ children }: Props) => {
    return (
        <main className='min-h-screen min-w-screen flex-col gap-20 bg-white flex items-center justify-center'>
            {children}
        </main>
    )
}

export default index