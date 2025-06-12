import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
 

export async function GET(req:NextRequest) {
    const session = await auth.api.getSession({
        query: {
            disableCookieCache: true,
        }, 
        headers: req.headers, 
    });
if(!session){
    return NextResponse.json({message:"user not found"})

}


const cookies = req.headers.get("set-cookie");
const headers = req.headers.get("x-custom-header");

console.log("Cookies is ",cookies)
console.log("Headers is ",headers)

return NextResponse.json({session})


}
