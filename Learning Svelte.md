Variables definidas en el script se pueden referenciar directamente
Ej

```
<script>
    let learning = 'Svelte';
</script>

<h1>{learning}</h1>
```

Output:
Svelte

Un mejor ejemplo para i18n

```
<script lang="ts">
	import { t, locale } from 'svelte-i18n';

	function switchLocale(lang: string) {
		locale.set(lang);
	}

	let learning = 'Svelte';
</script>

<h1>{$t('title')}</h1>
```

En base al lenguaje importa de los jsons el title
Muy simple, muy poco texto.

Se puede usar para embeber atributos tambien
ej
```
<img src={nombreDeLafuenteEnScript}>
```
Se puede usar "{var} etc"

Se puede obviar poner src={src} por ejemplo y ponerlo directo como {src}

el style dentro de la pagina queda scoped a los componentes de la pagina, es decir que si importo componentes con lo mismo
Ej 

```
//Donde otroP = <p> Soy otro parrafo </p>

<script> 
import OtroP from 'path';
</script>

<p> soy un parrafo </p>
<OtroP />
```

Se preserva el estilo del componente importado. Incluso si el estilo se aplica al tag p

/**************************/
Important: Svelte doesn’t perform any sanitization of the expression inside {@html ...} before it gets inserted into the DOM. This isn’t an issue if the content is something you trust like an article you wrote yourself. However if it’s some untrusted user content, e.g. a comment on an article, then it’s critical that you manually escape it
/*************************/

SVELTE NO PREVIENE XSS POR DEFAULT RECORDAR EL ESCAPE DEL CONTENIDO

con @html puedo rednerizar html dentro de un componente

$state() para mantener reactividad de componentes :)
Se puede utilizar con arrays tb y pushear componentes o etc al array en si. Estas mutaciones no afectan al objeto original,
se forma una 'copia' digamos.
Eso es agregando cosas ej 

```
<script>
	let numbers = $state([1, 2, 3, 4]);

	function addNumber() {
	numbers.push(numbers.length + 1);
	}
</script>

<p>{numbers.join(' + ')} = ...</p>
```

Otro tipo es el derivado
Seria cuando un objeto depende explicitamente de otro
Ej:

```
<script>
	let numbers = $state([1, 2, 3, 4]);
	let total = $derived(numbers.reduce((t, n) => t+n, 0));
	function addNumber() {
		numbers.push(numbers.length + 1);
	}
</script>

<p>{numbers.join(' + ')} = {total}</p>
```

Se hace de forma lazy, es decir que solo se computa cuando hay cambios en el estado previo, 
por lo que es eficiente en cuanto a recursos
El estado derivado es 'read only' realmente es computado.

Para poder ver el valor actual de algo con estado cambiante
se puede utilizar 
$state.snapshot(itemQueCambia)
Eso agarra una copia del proxy (el estado actual)
Y si no

$inspect(item)  causaria que a cada cambio este se loggee
se puede pasar una funcion de forma que ese output se modifique o loggee de otra forma

uso de la runa $effect (preferible evitarla) o mantener esos efectos en un event handler

se pueden usar cleanups en los efectos por ejemplo, luego de hacer x accion, borra los objetos/ estados viejos.
Si no, no podrias actualizar el nuevo. (Si uno estuviera incrementando un intervalo, y de la nada 
tratase de achicarlo, no pasaria nada. Porque estan los intervalos viejos. Para evitar eso, lo viejo se debe limpiar)

Las runas solo se pueden utilizar en .svelte.js files
Es decir que si quiero utilizar u exportar runas, deben ser de o en un .svelete.js file

Puedo hacer por ejemplo:
```
export const counter = $state({
	count: 0
});
```

Cualquier componente que importe y utilice ese contador va a actualizarlo para todo el resto tambien.

Herencia de componentes 

Ej:

El Nested.svelte (recibe cosas del padre)
```
<script>
	let { answer } = $props();
</script>

<p>The answer is {answer}</p>
```

El padre:
```
<script>
	import Nested from './Nested.svelte';
</script>

<Nested answer={42} />
```

Esto lleva a que se imprima The answer is 42 x ejemplo 

Se pueden asignar valores default en caso de que no haya nada que levantar.

Ejemplo:

let { answer = 'a mystery' } = $props() Toma por default a mystery en caso de que en el padre 
no se pase ninguna variable 

Es valido tomar todos los props como si fueran un json, o decir answer, ...stuff y eso lo autoasignaria

Ejemplo if else if

```
<script>
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<button onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
	<p>{count} is greater than 10</p>
{:else if count < 5}
	<p>{count} is less than 5 </p>
{:else}
	<p>{count} is between 5 and 10</p>
{/if}```

Ejemplo for each

````
<script>
	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = $state(colors[0]);
</script>

<h1 style="color: {selected}">Pick a colour</h1>
//puede no tener el indice pero qcyo esta god 
<div>
{#each colors as color, i}
<button 
	style="background: {color}"
	aria-label={color}
	aria-current={selected === color}
	onclick= {() => selected = color}>{i + 1}
</button>
{/each}
</div>

<style>
	h1 {
		transition: color 0.2s;
	}

	div {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		max-width: 400px;
	}

// comentario, pero estos botones se ven re lindos! (robables)
	button {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: translate(-2px,-2px);
		filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
		transition: all 0.1s;
	}

	button[aria-current="true"] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
	}
</style>```

By default, when you modify the value of an each block, it will add and remove DOM nodes at the end of the block, and update any values that have changed. That might not be what you want.
La solucion de eso es asignar el id especifico a cada thing. De forma que se actualizen de a pares.
Eso o hacer que tome un valor derivado (pero ... pa que complicarla no?)


await, then catch 

cada div tiene listener
<div {listenerQueHagaXcosa}>

Se puede usar funciones lambda dentro del div 
Ej
````
<div
onpointermove={(event) => {
    m.x = event.clientX;
    m.y = event.clientY;
}}>
```
Otro evento es el onkeydowncapture (asumo que debe haber un onkeyupcapture o un onkeyreleasecapture)
o puede ser onkeydown

Se puede pasar funciones a los componentes como en todo js xd
Es valido pasar lambdas ahi tb

Puedo pasar event handlers tambien como props
se le pasa como {...props}

Text input
Ej:
```
<script>
	let name = $state('world');
</script>

<input bind:value={name} />

<h1>Hello {name}!</h1>```

Para number
tengo input type number e input type range
hacen lo mismo de forma distinta

Para checkboxes usan un toggle

Ej:

```
<script>
	let yes = $state(false);
</script>

<label>
	<input type="checkbox" bind:checked={yes} />
	Yes! Send me regular email spam
</label>

{#if yes}
	<p>
		Thank you. We will bombard your inbox and sell
		your personal details.
	</p>
{:else}
	<p>
		You must opt in to continue. If you're not
		paying, you're the product.
	</p>
{/if}

<button disabled={!yes}>Subscribe</button>
```

Ejemplo select:

```
<script>
	let questions = $state([
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	]);

	let selected = $state();

	let answer = $state('');

	function handleSubmit(e) {
		e.preventDefault();

		alert(
			`answered question ${selected.id} (${selected.text}) with "${answer}"`
		);
	}
</script>

<h2>Insecurity questions</h2>

<form onsubmit={handleSubmit}>
	<select
		bind:value={selected}
		onchange={() => (answer = '')}
	>
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer} />

	<button disabled={!answer} type="submit">
		Submit
	</button>
</form>

<p>
	selected question {selected
		? selected.id
		: '[waiting...]'}
</p>
```

Ejemplo multi radio/ checkbox

```
<script>
	let scoops = $state(1);
	let flavours = $state([]);

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
	<label>
		<input
			type="radio"
			name="scoops"
			value={number}
			bind:group={scoops}
		/>

		{number} {number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}

<h2>Flavours</h2>

{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
	<label>
		<input
			type="checkbox"
			name="flavours"
			value={flavour}
			bind:group={flavours}
		/>

		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}
```

```
<select multiple bind:value={flavours}>
{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
	<option>{flavour}</option>
{/each}
</select>```

tambien hay para textarea y etc

se pueden usar clases con el if clicked o selected pero mas lindo
	<button
		class="card"
		class:flipped={flipped}
		onclick={() => flipped = !flipped}
	> eso lo hace automatico je

    si el nombre de la clase es igual al nombre de la variable
    que trackea
    puedo poner directamente
    class:flipped

    re lindo

    lo mismo se puede hacer con el estilo

<button
	class="card"
	style:transform={flipped ? 'rotateY(0)' : ''}
	style:--bg-1="palegoldenrod"
	style:--bg-2="black"
	style:--bg-3="goldenrod"
	onclick={() => flipped = !flipped}
>

<style>
	.box {
		width: 5em;
		height: 5em;
		border-radius: 0.5em;
		margin: 0 0 1em 0;
		background-color: var(--color, #ddd);
	}
</style>
para tener colores custom

<div class="boxes">
	<Box --color="red" />
	<Box --color="green" />
	<Box --color="blue" />
</div>

pueden ser dinamicos, con una variable tambien o simplemente definir estas coass
para cada clase

recordar remover listeners no usados

tool tips


<button use:tooltip={() => ({ content })}>
	Hover me
</button>

se le pueden agregar transiciones y etc a los html directamente in code
con fade hace fade
con fly puede subir o bajar con un fade

podes poner in transition y out transition

se pueden hacer custom css transitions con funciones lambda facilmente

se pueden asignar transiciones globales

<div transition:slide|global>
	{item}
</div>

Key blocks destroy and recreate their contents when the value of an expression changes. This is useful if you want an element to play its transition whenever a value changes instead of only when the element enters or leaves the DOM.

{#key i}
	<p in:typewriter={{ speed: 10 }}>
		{messages[i] || ''}
	</p>
{/key}

se pueden crear clases con getters y setters, y constructores!

con el # se convierten en variables digamos

Se pueden recibir tipos de svelte! ej sveltedate

tienen listas, etc
el resto parece similar a otros frameworks / js
