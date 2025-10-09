import { useState } from "react"
import { useLogin } from "../../context/authContext";

export default function LoginPage() {
    const { login } = useLogin();

    const [formData, setFormData] = useState(
        {
            email: 'tester@gmail.com',
            password: 'asdf1234!@#$'
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

        login();
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <form className="flex flex-col justify-center items-center gap-6" onSubmit={handleSubmit}>
                <h3 className="font-semibold text-sm text-gray-600 text-center">Login to your account</h3>
                <input className="bg-slate-100 w-[20rem] px-4 py-2 rounded-md outline-0" name="email" type="email" placeholder="Email" onChange={handleChange_Login} value={formData.email} />
                <input className="bg-slate-100 w-[20rem] px-4 py-2 rounded-md outline-0" name="password" type="password" placeholder="Password" onChange={handleChange_Login} value={formData.password} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md" type="submit">Login</button>
            </form>
        </div>
    )
}