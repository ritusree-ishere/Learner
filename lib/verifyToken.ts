import jwt from "jsonwebtoken";

export function verifySession(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.BETTER_AUTH_SECRET!); // Ensure JWT_SECRET is set
        return decoded; // Example: { user: { id: "123", email: "test@xyz.com", role: "ADMIN" } }
    } catch (error) {
        console.error("Invalid session token:", error);
        return null;
    }
}
