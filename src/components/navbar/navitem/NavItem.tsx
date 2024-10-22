import { A } from '@solidjs/router';
import {JSXElement} from 'solid-js';

interface NavItemProps {
    href: string;
    icon: JSXElement;
    label: string;
    isBlank?: boolean;
    location: { pathname: string };
}

function NavItem({ href, icon, label, isBlank = false, location }: NavItemProps) {
    const isActive = location.pathname === href;

    return (
        <li class={isActive ? 'active' : ''}>
            <A href={href} target={isBlank ? '_blank' : '_self'}>
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
