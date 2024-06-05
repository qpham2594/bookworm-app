"use client";

import { signOut } from "next-auth/react";

export default function SignOutComp() {

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
        setSignedOut(true);
    };

    return (
        <div>
                <button onClick={handleSignOut}>Click to sign out</button>
        </div>
    );
}


