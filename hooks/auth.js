// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import useSWR from 'swr';

// export const useAuth = (middleware) => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);

//   const { data: user, error, mutate } = useSWR('/api/v1/user', () =>
//     axios
//       .get('/api/v1/user')
//       .then((response) => response.data.data)
//       .catch((error) => {
//         if (error.response?.status !== 409) {
//           throw error;
//         }
//       })
//   );

//   const csrf = () => axios.get('/sanctum/csrf-cookie');

//   const login = async ({ setErrors, ...props }) => {
//     setErrors([]);
//     await csrf();

//     try {
//       await axios.post('/api/v1/login', props);
//       await mutate(); // refresh user data
//       router.push('/dashboard');
//     } catch (error) {
//       if (error.response?.status !== 422) throw error;
//       setErrors(Object.values(error.response.data.errors).flat());
//     }
//   };

//   const logout = async () => {
//     await axios.post('/logout');
//     await mutate(null);
//     router.push('/');
//   };

//   useEffect(() => {
//     if (user || error) {
//       setIsLoading(false);

//       if (middleware === 'guest' && user) {
//         router.push('/client-portal');
//       }

//       if (middleware === 'auth' && error) {
//         router.push('/login');
//       }
//     }
//   }, [user, error, middleware, router]);

//   return {
//     user,
//     csrf,
//     isLoading,
//     login,
//     logout,
//     register: async () => { },
//     forgotPassword: async () => { },
//   };
// };
