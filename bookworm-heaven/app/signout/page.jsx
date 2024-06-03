"use client"

import { signOut } from "next-auth/react";


export default function SignOutPage() {
  return (
    <div>
        <button onClick={signOut}> Signout Confirmation </button>
    </div>
  )
}
