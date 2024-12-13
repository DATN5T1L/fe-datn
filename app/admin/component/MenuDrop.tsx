import React from "react";
import Link from "next/link";
import d from "@public/styles/admin/component/MenuDrop.module.css";
import { Arrow } from "@app/(user-global)/component/icon/icons";

interface DropdownItem {
    href: string;
    label: string;
}

interface CustomDropdownProps {
    icon: React.ReactNode;
    title: string;
    items: DropdownItem[];
    isOpen: boolean; // Trạng thái mở/đóng từ cha
    onToggle: () => void; // Hàm toggle từ cha
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ icon, title, items, isOpen, onToggle }) => {
    return (
        <div className={d.Menu}>
            <button onClick={onToggle} className={d.btn}>
                <div className={d.btnContent}>
                    {icon} {title}
                </div>
                <Arrow deg={isOpen ? "180" : "90"} />
            </button>
            {isOpen && (
                <ul className={d.Lists}>
                    {items.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <li className={d.item}>
                                <div className={d.content}>{item.label}</div>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
