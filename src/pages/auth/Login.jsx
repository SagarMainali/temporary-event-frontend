import { useState } from "react"
import { useLogin } from "../../context/authContext";
import { loginUrl } from "@/config/urls"
import { toast } from "sonner"
import axios from "@/axiosConfig"
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const { setIsLoggedIn, setUserData } = useLogin();

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const logInUser = async () => {
            try {
                const response = await axios.post(loginUrl, {
                    ...formData
                });
                if (response.data.success)
                    toast.success("Successfully logged in");
                setIsLoggedIn(true);
                setUserData(response.data.data);
            } catch (error) {
                toast.error("Failed to login");
                console.error("Error logging in", error);
            }
        };

        logInUser();
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <form className="flex flex-col justify-center items-center gap-6" onSubmit={handleSubmit}>
                <h3 className="font-semibold text-sm text-gray-600 text-center">Login to your account</h3>
                <input className="bg-slate-100 w-[20rem] px-4 py-2 rounded-md outline-0" name="email" type="email" placeholder="Email" onChange={handleChange_Login} value={formData.email} />
                <input className="bg-slate-100 w-[20rem] px-4 py-2 rounded-md outline-0" name="password" type="password" placeholder="Password" onChange={handleChange_Login} value={formData.password} />
                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}