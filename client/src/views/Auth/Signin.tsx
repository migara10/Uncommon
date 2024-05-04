import { Role, SignIn } from '@/types';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';


const Signin = () => {
    const schema: ZodType<SignIn> = z.object({
        firstName: z.string().min(2).max(30),
        lastName: z.string().min(2).max(30),
        email: z.string().email(),
        password: z.string().min(2).max(8),
        userType: z.enum([Role.ADMIN, Role.USER]),
        confirmPassword: z.string().min(2).max(8),

    }).refine((data) => data.password === data.confirmPassword, {
        message: "password do not match",
        path: ["confirmPassword"]
    });

    const { register, handleSubmit, formState: { errors } } = useForm<SignIn>({ resolver: zodResolver(schema) });

    const submitData = async (data: SignIn) => {
        const { confirmPassword, ...postData } = data;
        try {
            const response = await axios.post('http://localhost:3000/auth/sign-up', postData)
            console.log(response)
        } catch {

        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md" onSubmit={handleSubmit(submitData)}>
                <div className='flex'>
                    <div className="mb-4 mr-2">
                        <label htmlFor="firstName" className="block font-bold text-gray-700 mb-2text-sm">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            {...register("firstName")}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            placeholder="First Name"

                        />
                        {errors.firstName && (
                            <div>
                                <span className='text-red-400'>{errors.firstName.message}</span>
                            </div>
                        )}

                    </div>
                    <div className="mb-4 ml-2">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-bold text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            {...register("lastName")}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            placeholder="Last Name"
                        />
                        {errors.lastName && (
                            <div>
                                <span className='text-red-400'>{errors.lastName.message}</span>
                            </div>
                        )}
                    </div>
                </div>
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
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register("confirmPassword")}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && (
                        <div>
                            <span className='text-red-400'>{errors.confirmPassword.message}</span>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="userType" className="block mb-2 text-sm font-bold text-gray-700">
                        User Type
                    </label>
                    <select
                        id="userType"
                        {...register("userType")}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signin;
