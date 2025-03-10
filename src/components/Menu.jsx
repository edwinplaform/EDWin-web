import Link from "next/link";
import Image from "next/image";
import {getCurrentUser} from "@/util/auth";

const user = getCurrentUser();
const userRole = user?.role;

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: "/message.png",
                label: "Messages",
                href: "/portal/messages",
                visible: ["TUTOR", "STUDENT"],
            },
            {
                icon: "/tutor.png",
                label: "Teachers",
                href: "/portal/tutors",
                visible: ["ADMIN"],
            },
            {
                icon: "/student.png",
                label: "Appointments",
                href: "/portal/appointments",
                visible: ["TUTOR"],
            },
            {
                icon: "/lesson.png",
                label: "My Classes",
                href: "/portal/students/classes",
                visible: ["STUDENT"],
            },
            {
                icon: "/lesson.png",
                label: "My Classes",
                href: "/portal/tutors/classes",
                visible: ["TUTOR"],
            },
            {
                icon: "/invoice.png",
                label: "Invoice",
                href: "/portal/invoices",
                visible: ["STUDENT"],
            },
            {
                icon: "/calendar.png",
                label: "Schedule",
                href: "/portal/schedule",
                visible: ["TUTOR", "STUDENT"],
            },
            {
                icon: "/payment.png",
                label: "Payment",
                href: "/portal/payments",
                visible: ["TUTOR"],
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
                visible: ["TUTOR", "STUDENT"],
            },
        ],
    },
];

const Menu = () => {
    return (
        <div className="mt-1 text-sm">
            {menuItems.map((i, index) => (
                <div className="flex flex-col gap-2" key={index}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">
                        {i.title}
                    </span>
                    {i.items.filter(item => item.visible.includes(userRole))
                        .map(item => (
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