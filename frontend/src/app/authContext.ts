// import React from 'react';
// import { useState,createContext } from 'react';
// import { useRouter } from 'next/router';

// const AuthContext = createContext({isAuthenticated: false,
//     setIsAuthenticated: () => {}}
// );

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // Implement logic to handle authentication state (e.g., checking token)

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider> 
//  );
// };

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useContext(AuthContext);
//   const router = useRouter();

//   if (!isAuthenticated) {
//     router.push('/login'); // Redirect to login page if not authenticated
//     return null;
//   }

//   return children; // Render the wrapped component if authenticated
// }