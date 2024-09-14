// import Link from "next/link";
//
// const NotFound = () => {
//     return (
//         <section className="bg-white p-4">
//             <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
//                 <div className="mx-auto max-w-screen-sm text-center">
//                     <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
//                     <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">{"Something's"} missing.</p>
//                     <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we {"can't"} find the page. {"You'll"} find lots to explore on the home page.</p>
//                     <Link href="/" className="inline-flex m-10 text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Back to Home</Link>
//                 </div>
//             </div>
//         </section>
//     )
// }
//
// export default NotFound;

import React from 'react';
import { Button, Result } from 'antd';
const App = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary" href="/">Back Home</Button>}
    />
);
export default App;