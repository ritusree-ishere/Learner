import { auth } from "@/lib/auth"; // Import Better Auth instance
import { headers } from "next/headers";

export default async function User() {
    // Get session from Better Auth
    const session = await auth.api.getSession({
        headers:await headers(), 
    });

    return (
        <div>
            <h1>User Data</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}
