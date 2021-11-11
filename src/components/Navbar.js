import React from "react";
import { Link } from "react-router-dom";
import {
	Navbar,
	NavbarBrand,
	Collapse,
	NavbarToggler,
	Nav,
	NavItem,
} from "reactstrap";

const links = [
	{ href: `/`, text: "Pokedex" },
	{ href: `/mypokemon`, text: "My Pokemon" },
];
const createNavItem = (key, item) => (
	<NavItem className="ml-3">
		<Link className="text-white" key={key} to={item.href}>
			{item.text}
		</Link>
	</NavItem>
);

const NavbarComponent = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	const toggleIsOpen = () => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};
	return (
		<div>
			<Navbar color="danger" dark expand="md">
				<NavbarBrand className="text-white">Pokemon Web</NavbarBrand>
				<NavbarToggler
					className="me-2"
					onClick={() => {
						toggleIsOpen();
					}}
				/>
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{links.map((item, key) => {
							return createNavItem(key, item);
						})}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export { NavbarComponent };
