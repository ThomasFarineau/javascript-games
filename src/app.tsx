import {MetaProvider} from '@solidjs/meta';
import {Router} from '@solidjs/router';
import {FileRoutes} from '@solidjs/start/router';
import {Suspense} from 'solid-js';
import './main.sass';
import Navbar from '~/components/navbar/Navbar';

export default function App() {
    return <Router
        base={import.meta.env.SERVER_BASE_URL}
        root={props => <MetaProvider>
            <Navbar/>
            <Suspense><main>{props.children}</main>
            </Suspense>
        </MetaProvider>}>
        <FileRoutes/>
    </Router>;
}
