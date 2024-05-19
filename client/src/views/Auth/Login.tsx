import { setUser } from "@/store/reducers/userSlice"
import { LogIn, Role } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ZodType, z } from "zod"


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user1 = {
        firstName: "migara",
        lastName: "tennakoon",
        email: "migara@gmail.com",
        password: "1234",
        userType: Role.ADMIN 
    }

    const schema: ZodType<LogIn> = z.object({
        email: z.string().email(),
        password: z.string().min(2).max(8)
    })

    const { register, handleSubmit, formState: { errors } } = useForm<LogIn>({
        resolver: zodResolver(schema)
    })

    const submitData = async (data: LogIn) => {
        try {
            const response: any = await axios.post('http://localhost:3000/auth/sign-in', data)
            if(response){
                console.log(response.data.user);
                dispatch(setUser(response.data.user));
                localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
                navigate('/home/about');
            }
        } catch {

        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md" onSubmit={handleSubmit(submitData)}>
               
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <div>
                            <span className='text-red-400'>{errors.email.message}</span>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password")}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <div>
                            <span className='text-red-400'>{errors.password.message}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login