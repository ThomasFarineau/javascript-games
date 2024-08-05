import {MetaProvider, Title} from "@solidjs/meta";
import {A, Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start/router";
import {Suspense} from "solid-js";
import "./main.sass";
import Navbar from "~/components/navbar/Navbar";

export default function App() {
    return <Router
        base={import.meta.env.SERVER_BASE_URL}
        root={props => <MetaProvider>
            <Title>SolidStart - Basic</Title>
            <Navbar/>
            <Suspense>{props.children}</Suspense>
        </MetaProvider>}
    >
        <FileRoutes/>
    </Router>;
}
