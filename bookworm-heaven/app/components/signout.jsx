"use client";

import { signOut } from "next-auth/react";

export default function SignOutComp() {

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
        setSignedOut(true);
    };

    return (
        <div className="flex min-h-screen flex-col justify-between p-24 bg-gradient-to-b from-[#f5ebff] via-[#eae4ff] via-[#dddeff] via-[#ccd8ff] to-[#b9c9fb]">
                <button 
                onClick={handleSignOut} 
                className=" p-4 border rounded border-purple-900 hover:shadow-md hover:bg-lightyellow font-semibold" 
                > Would you like to leave? Click here to sign out and we'll see you later!</button>
        </div>
    );
}


