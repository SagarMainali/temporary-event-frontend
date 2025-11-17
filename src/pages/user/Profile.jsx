import { useLogin } from '@/context/authContext';
import React from 'react'

export default function Profile() {

    const { userData } = useLogin();
    console.log("🚀 ~ Profile ~ userData:", userData);

    return (
        <div>
            Logged in as <strong>{userData?.username}</strong>
        </div>
    )
}
