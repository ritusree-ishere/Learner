'use client'
import { authClient, useSession } from "@/lib/auth-client" // import the auth client
 
// or 
// const { data: session, error } = await authClient.getSession()
export default  function User(){
 
    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } =  authClient.useSession() 

    // const { data:session, error, isPending } = useSession()
if (error) {
    //handle error
}
 
    return (
        <>
        <div>{JSON.stringify(session)}</div>
        <p>User data</p>
        </>
    )
}