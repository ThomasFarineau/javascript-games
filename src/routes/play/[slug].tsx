import { useParams, useNavigate } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js';
import componentsMap from '../../games';
import { Title } from '@solidjs/meta';
import * as indexes from '../../games/index.json';

export default function Play() {
    const params = useParams();
    const navigate = useNavigate();

    const componentLoader = componentsMap[params.slug];

    if (!componentLoader) {
        navigate('/404');
        return null;
    }

    const [title, setTitle] = createSignal('');
    const [Component, setComponent] = createSignal(null);

    onMount(() => {
        const data = indexes.default.find(i => i.slug === params.slug);
        if (data) {
            setTitle(data.name);
        } else {
            navigate('/404');
            return;
        }

        componentLoader().then(comp => {
            setComponent(() => comp.default);
        });
    });

    return (
        <div>
            <Title>{title()}</Title>
            {Component() ? <Component /> : <div id={'loader'}>Loading...</div>}
        </div>
    );
}
