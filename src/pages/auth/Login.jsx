import { useState } from "react"
import { useLogin } from "../../context/authContext";
import { loginUrl } from "@/config/urls"
import { toast } from "sonner"
import axios from "@/axiosConfig"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const { setIsLoggedIn } = useLogin();

    const [loggingIn, setLoggingIn] = useState(false);

    const [formData, setFormData] = useState(
        {
            email: 'tester@gmail.com',
            password: '!@#$TESTER1234'
        }
    )

    function handleChange_Login(e) {
        const { name, value } = e.target

        setFormData(
            (prevState) => (
                {
                    ...prevState,
                    [name]: value

                }
            )
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoggingIn(true);
            const response = await axios.post(loginUrl, {
                ...formData
            });
            // console.log("🚀 ~ logInUser ~ response:", response)
            if (response.data.success)
                toast.success("Successfully logged in");
            setIsLoggedIn(true);
        } catch (error) {
            toast.error("Failed to login");
            // console.error("Error logging in", error);
        } finally {
            setLoggingIn(false);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <form className="flex flex-col justify-center items-center gap-6" onSubmit={handleSubmit}>
                <h3 className="font-semibold text-sm text-gray-600 text-center">Login to your account</h3>
                <input className="bg-slate-100 w-[20rem] px-4 py-2 rounded-md outline-0" name="email" type="email" placeholder="Email" onChange={handleChange_Login} value={formData.email} />
                <input className="bg-slate-100 w-[20rem] px-4 py-2 rounded-md outline-0" name="password" type="password" placeholder="Password" onChange={handleChange_Login} value={formData.password} />
                <Button type="submit" disabled={loggingIn}>
                    {
                        loggingIn
                            ? <span className="flex gap-2 items-center">Logging In <Loader2 className="animate-spin text-gray-600" size={24} /></span>
                            : 'Login'
                    }
                </Button>
            </form>
        </div>
    )
}