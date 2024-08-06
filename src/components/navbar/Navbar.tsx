import './Navbar.sass';
import {useLocation} from '@solidjs/router';
import NavItem from '~/components/navbar/navitem/NavItem';
import {createSignal, For, onMount} from 'solid-js';
import * as indexes from '../../games/index.json'
import {AiOutlineHome, AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineSearch} from 'solid-icons/ai';
import {VsGitCommit} from 'solid-icons/vs';

export default function Navbar() {
    const location = useLocation();
    const [isClosed, setIsClosed] = createSignal(false);
    const [list, setList] = createSignal([]);
    const [searchTerm, setSearchTerm] = createSignal('');

    const toggleMenu = () => {
        setIsClosed(!isClosed());
    };

    onMount(() => {
        // Load the data when the component mounts
        setList(indexes.default);
    });

    const filteredList = () => {
        const term = searchTerm().toLowerCase();
        return list().filter(item => item.name.toLowerCase().includes(term));
    };

    return (<>
        <aside class={isClosed() ? 'closed' : ''}>
            <header>
                <div class="hide-on-closed">
                    <div class="title">
                        <div>Javascript</div>
                        <div>Games</div>
                    </div>
                </div>
                <div class="menu" onClick={toggleMenu}>
                    <div class="close"><AiOutlineMenuFold/></div>
                    <div class="open"><AiOutlineMenuUnfold/></div>
                </div>
            </header>
            <div class="search">
                <label>
                    <AiOutlineSearch/>
                    <input
                        type="text"
                        class={'hide-on-closed'}
                        placeholder="Search..."
                        onInput={(e) => setSearchTerm(e.target.value)}/>
                </label>
            </div>
            <nav>
                <ul>
                    <NavItem
                        href="/"
                        icon={<AiOutlineHome/>}
                        label="Index"
                        location={location}/>
                    <NavItem
                        href="https://github.com/ThomasFarineau/javascript-games"
                        icon={<VsGitCommit/>}
                        label="Contribute"
                        isBlank={true}
                        location={location}/>
                </ul>
                <div class="separator"></div>
                <ul>
                    <For each={filteredList()}>
                        {(index) => (<NavItem
                            href={index.slug}
                            icon={<img src={index['nav-icon']} alt={index.name}/>}
                            label={index.name}
                            location={location}/>)}
                    </For>
                </ul>
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
        </aside>
    </>);

}
