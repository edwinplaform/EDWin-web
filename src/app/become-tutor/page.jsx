import Link from "next/link";
import {UserButton} from "@clerk/nextjs";

const BecomeTutor = () => {
    return (
        <div>
            <div>become tutor</div>
            <Link href="/tutor/signup">
                <button>Become a tutor</button>
            </Link>

            <UserButton/>
        </div>
    );
};

export default BecomeTutor;