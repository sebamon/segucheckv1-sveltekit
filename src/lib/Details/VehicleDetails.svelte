<script lang="ts">
	// Datos del usuario a mostrar
	export let user_id = 0;
	export let cuit = 0;
	export let firstName = '';
	export let lastName = '';
	export let email = '';
	export let phone = '';
	export let gender = '';
	export let dateOfBirth = '';
	export let nationality = '';
	export let studyLevel = '';
	export let degree = '';
	export let roles = [];

	// Pasar inicial de género a texto legible:
	let genderText;
	if (gender == 'M') {
		genderText = 'Varón';
	} else if (gender == 'F') {
		genderText = 'Mujer';
	} else {
		genderText = gender;
	}
</script>