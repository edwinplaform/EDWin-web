import Image from "next/image";

const Button = ({type, title, variant, full}) => {
    return (
        <button
            className={`flexCenter gap-3 rounded-full border-2 ${variant} ${full && 'w-full'} `}
            type={type}>

            <label className="text-[16px] font-[700] whitespace-nowrap cursor-pointer">{title}</label>
        </button>

    );
};

export default Button;