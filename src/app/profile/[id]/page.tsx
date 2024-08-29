'use client'


export default function Page({ params }: any) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
       <h1>Profile Page</h1>
       <h2 className="p-3 bg-green-300 rounded-md text-black">{params.id}</h2>     
        </div>
    )
}