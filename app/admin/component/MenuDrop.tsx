import React, { useState } from "react";
import Link from "next/link";
import d from "@public/styles/admin/component/MenuDrop.module.css";
import { Arrow } from "@app/(user-global)/component/icon/icons"

interface DropdownItem {
    href: string;
    label: string;
}

interface CustomDropdownProps {
    icon: React.ReactNode;
    title: string;
    items: DropdownItem[];
}
const CustomDropdown: React.FC<CustomDropdownProps> = ({ icon, title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={d.Menu}>
            <button onClick={toggleDropdown} className={d.btn}>
                <div className={d.btnContent}> {icon} {title}</div> <Arrow deg="90" />
            </button>
            {isOpen && (
                <ul
                    className={d.Lists}
                >
                    {items.map((item, index) => (
                        <Link href={item.href}>
                            <li key={index} className={d.item}>

                                <div className={d.content}>
                                    {item.label}
                                </div>

                            </li>
                        </Link>
                    ))}
                </ul>
            )
            }
        </div >
    );
};

export default CustomDropdown;
