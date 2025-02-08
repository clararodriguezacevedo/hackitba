<script>
	// @ts-nocheck

	import GoBack from '../../../components/GoBack.svelte';
	const initialFormState = { name: '', email: '', phone: '' };

	// let formData = { ...initialFormState };
	let formData = { ...initialFormState };

	let formTemplate = [
		{
			title: 'name',
			prompt: 'Nombre completo:',
			type: 'text',
			required: true
		},
		{
			title: 'email',
			prompt: 'Email de contacto:',
			type: 'email',
			required: true
		},
		{
			title: 'phone',
			prompt: 'Teléfono de contacto (opcional)',
			type: 'tel',
			required: false
		}
	];

	async function handleSubmit(e) {
		e.preventDefault();

        let {name, email, phone} = formData

        let companyName = ""

        let message = `You have registered to participate as a mentor in the next edition of HackITBA. We will reach out to you as soon as possible.`

        const response = await fetch("/api/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, companyName, role: "mentor", email, subject: "Confirmation", message }),
        });

        const result = await response.json();
        let successMessage = result.status === "success" ? "Email sent successfully!" : "Error sending email."
        console.log(successMessage)
        formData = { ...initialFormState };
	}
</script>

<div class="w-100 bg-hackit-grey flex flex-col text-[white]">
	<GoBack prevUrl="/collaborate" />
	<div class="mx-auto my-10 max-w-3xl space-y-8">
		<div class="space-y-8 px-2">
			<h2 class=" text-center text-lg">Inscripción para Mentores y Jurados - HackITBA 2025</h2>
			<p>
				¡Gracias por tu interés en ser parte de HackITBA 2025! Estamos buscando mentores y jurados
				que nos ayuden a hacer de esta hackatón una experiencia inolvidable para los participantes.
			</p>
			<ol class="list-disc pl-4">
				<li>
					Como mentor, guiarás a los equipos durante la competencia, ofrecerás feedback sobre sus
					proyectos y participarás en la preselección de los finalistas.
				</li>
				<li>
					Como jurado, evaluarás a los equipos finalistas durante sus presentaciones (pitch) y
					ayudarás a elegir al proyecto ganador.
				</li>
			</ol>
			<p>Por favor completa el formulario con tus datos. Nos pondremos en contacto contigo.</p>
		</div>

		<form
			class="text-hackit-grey mx-auto my-10 space-y-4 rounded-lg bg-[white] p-6 shadow-xl"
			on:submit={handleSubmit}
		>
			{#each formTemplate as { title, prompt, type, required }}
				<div>
					<label class="mb-4 block space-y-2 text-sm font-medium text-gray-700"
						><p>{prompt}</p>
						<input
							{type}
							bind:value={formData[title]}
							class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
							{required}
						/>
					</label>
				</div>
			{/each}

			<button
				type="submit"
				class="bg-hackit-green hover:bg-hackit-dark-green w-full rounded-md py-2 text-[white] transition duration-200 hover:bg-blue-700"
			>
				Send
			</button>
		</form>
	</div>
</div>
