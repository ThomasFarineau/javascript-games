import "./Navbar.sass";
import {useLocation} from "@solidjs/router";
import NavItem from "~/components/navbar/navitem/NavItem";
import {createSignal} from "solid-js";

export default function Navbar() {
    const location = useLocation();
    const [isClosed, setIsClosed] = createSignal(false);

    const toggleMenu = () => {
        setIsClosed(!isClosed());
    };

    const closeIcon = (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
             height="1em" width="1em" style="overflow: visible; color: currentcolor;">
            <path
                d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9 271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"></path>
        </svg>);

    const openIcon = (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
             height="1em" width="1em" style="overflow: visible; color: currentcolor;">
            <path
                d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1 298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path>
        </svg>);

    const searchIcon = (
        <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1em"
             width="1em" style="overflow: visible; color: currentcolor;">
            <path fill="currentColor"
                  d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9Zm0 16c3.867 0 7-3.133 7-7s-3.133-7-7-7-7 3.133-7 7 3.133 7 7 7Zm8.485.071 2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414Z"></path>
        </svg>);

    return <aside class={isClosed() ? "closed" : ""}>
        <header>
            <div class="hide-on-closed">
                <div class="title">
                    <div>Javascript</div>
                    <div>Games</div>
                </div>
            </div>
            <div class="menu" onClick={toggleMenu}>
                <div class="close">{closeIcon}</div>
                <div class="open">{openIcon}</div>
            </div>
        </header>
        <div class="search">
            <label>
                {searchIcon}
                <input type="text" class={"hide-on-closed"} placeholder="Search..."/>
            </label>
        </div>
        <nav>
            <ul>
                <NavItem
                    href="/"
                    icon={<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg"
                               viewBox="0 0 16 16"
                               height="1em" width="1em" style="overflow: visible; color: currentcolor;">
                        <path fill="currentColor"
                              d="m16 9.226-8-6.21-8 6.21V6.694l8-6.21 8 6.21zM14 9v6h-4v-4H6v4H2V9l6-4.5z"></path>
                    </svg>}
                    label="Home"
                    location={location}
                />
                <NavItem
                    href="https://github.com/ThomasFarineau/javascript-games"
                    icon={<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg"
                               viewBox="0 0 16 16"
                               height="1em" width="1em" style="overflow: visible; color: currentcolor;">
                        <path
                            d="M7.5 0h1v4.03a4 4 0 0 1 0 7.94V16h-1v-4.03a4 4 0 0 1 0-7.94V0ZM8 10.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z"></path>
                    </svg>}
                    label="Contribute"
                    isBlank={true}
                    location={location}
                />
            </ul>
            <div class="separator"></div>
        </nav>
        <footer>
            <a href="https://thomasfarineau.fr" target="_blank" rel="noopener noreferrer">
                <img src="https://avatars.githubusercontent.com/u/32244230?s=48&v=4" alt="PP"/>
                <div class="hide-on-closed">
                    <div class="name">
                        <div>Thomas</div>
                        <div>Farineau</div>
                    </div>
                </div>
            </a>
        </footer>
    </aside>;
}
