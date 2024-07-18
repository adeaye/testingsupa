"use client"
import { fetchFakeStore } from '@/utils/serverActions';

// const Button = () => {
//     return (
//         <button onClick={fetchFakeStore}>Click</button>
//     );
// }

const Button = ({text}) => {
    return (
        <button onClick={() => {}}>{text}</button>
    );
}

export default Button;