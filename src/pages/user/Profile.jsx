import { useLogin } from '@/context/authContext';
import React from 'react'

export default function Profile() {

    const { userData } = useLogin();

    return (
        <div>
            Logged in as <strong>{userData?.username}</strong>
        </div>
    )
}
