import { JSX } from "solid-js";
import { A } from "@solidjs/router";

interface NavItemProps {
    href: string;
    icon: JSX.Element;
    label: string;
    isBlank?: boolean;
    location: { pathname: string };
}

function NavItem({ href, icon, label, isBlank = false, location }: NavItemProps) {
    const isActive = location.pathname === href;

    return (
        <li class={isActive ? "active" : ""}>
            <A href={href} target={isBlank ? "_blank" : "_self"}>
                <span class="icon">
                    {icon}
                </span>
                <span class="label hide-on-closed">
                    {label}
                </span>
            </A>
        </li>
    );
}

export default NavItem;
