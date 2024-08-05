import { createSignal } from "solid-js";
import "./ComponentName.sass";

export default function ComponentName() {
  const [count, setCount] = createSignal(0);
  return (
    <section class="component-name">
      <h1>ComponentName</h1>
    </section>
  );
}
