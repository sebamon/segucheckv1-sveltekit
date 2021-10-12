<script>
	import Navbar from 'sveltestrap/src/Navbar.svelte';
	import NavbarBrand from 'sveltestrap/src/NavbarBrand.svelte';
	// import NavbarToggler from "sveltestrap/src/NavbarToggler.svelte"; - Sin usar
	import Nav from 'sveltestrap/src/Nav.svelte';
	// import NavItem from "sveltestrap/src/NavItem.svelte"; - Sin usar
	// import NavLink from "sveltestrap/src/NavLink.svelte"; - Sin usar
	// import Collapse from "sveltestrap/src/Collapse.svelte"; - Sin usar
	import ButtonDropdown from 'sveltestrap/src/ButtonDropdown.svelte'; // Modificado de UncontrolledDropdown
	import DropdownToggle from 'sveltestrap/src/DropdownToggle.svelte';
	import DropdownMenu from 'sveltestrap/src/DropdownMenu.svelte';
	import DropdownItem from 'sveltestrap/src/DropdownItem.svelte';
	import ListGroup from 'sveltestrap/src/ListGroup.svelte';
	import Form from 'sveltestrap/src/Form.svelte';
	import InputGroup from 'sveltestrap/src/InputGroup.svelte';
	import InputGroupText from 'sveltestrap/src/InputGroupText.svelte'; // Modificado de InputGroupAddon
	// import Label from "sveltestrap/src/Label.svelte";
	import Input from 'sveltestrap/src/Input.svelte';
	// import CustomInput from "sveltestrap/src/CustomInput.svelte";
	import Button from 'sveltestrap/src/Button.svelte';

	export let color;
	export let title;

	function searchHandle() {
		event.preventDefault();
	}
</script>

<Navbar class="sb-topnav navbar-expand" {color} dark expand="md">
	<NavbarBrand href=".">{title}</NavbarBrand>
	<Nav class="ml-auto" navbar>
		<Form inline>
			<InputGroup>
				<Input type="search" name="search" id="exampleSearch" placeholder="Search for..." />
				<InputGroupText>
					<Button color="primary" on:click={searchHandle}>
						<i class="fas fa-search" />
					</Button>
				</InputGroupText>
			</InputGroup>
		</Form>
		<ListGroup class="ml-auto ml-md-0">
			<ButtonDropdown nav inNavbar>
				<DropdownToggle nav caret>
					<i class="fas fa-user fa-fw ml-3" />
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem>
						<a class="dropdown-item" href="settings">Settings</a>
					</DropdownItem>
					<DropdownItem>
						<a class="dropdown-item" href="activity_log">Activity Log</a>
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem>
						<a class="dropdown-item" href="pages/authentication/login"> Logout </a>
					</DropdownItem>
				</DropdownMenu>
			</ButtonDropdown>
		</ListGroup>
	</Nav>
</Navbar>
