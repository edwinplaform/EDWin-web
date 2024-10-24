import Link from "next/link";
import Image from "next/image";

const menuItems = [
    {
        title: "MENU",
        items: [
            // {
            //     icon: "/home.png",
            //     label: "Home",
            //     href: "/",
            //     visible: ["admin", "teacher", "student", "parent"],
            // },
            {
                icon: "/message.png",
                label: "Messages",
                href: "/portal/messages",
                visible: ["teacher", "student"],
            },
            {
                icon: "/tutor.png",
                label: "Teachers",
                href: "/portal/tutors",
                visible: ["admin", "student"],
            },
            {
                icon: "/student.png",
                label: "Students",
                href: "/portal/students",
                visible: ["admin", "teacher"],
            },
            // {
            //     icon: "/calendar.png",
            //     label: "Subjects",
            //     href: "/portal/subjects",
            //     visible: ["teacher"],
            // },
            {
                icon: "/lesson.png",
                label: "Lessons",
                href: "/portal/lessons",
                visible: ["student"],
            },
            {
                icon: "/invoice.png",
                label: "Invoice",
                href: "/portal/invoices",
                visible: ["student"],
            },
            {
                icon: "/calendar.png",
                label: "Schedule",
                href: "/portal/schedule",
                visible: ["teacher"],
            },
            {
                icon: "/payment.png",
                label: "Payment",
                href: "/portal/payments",
                visible: ["teacher"],
            },

        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: "/setting.png",
                label: "My Account",
                href: "/portal/settings",
                visible: ["teacher", "student"],
            },
        ],
    },
];

const Menu = () => {
    return (
        <div className="mt-4 text-sm">
            {menuItems.map(i=>(
                <div className="flex flex-col gap-2" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">
                        {i.title}
                    </span>
                    {i.items.map(item=>(
                        <Link
                            href={item.href}
                            key={item.label}
                            className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-cusSkyLight"
                        >
                            <Image src={item.icon} alt="" width={20} height={20}/>
                            <span className="hidden lg:block">{item.label}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Menu;