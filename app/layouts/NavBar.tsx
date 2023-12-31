import React from 'react';
import { NavLink } from '@remix-run/react';
import { Svg } from '~/components';

type Props = {
	title: any;
	styles?: string;
	children: string | JSX.Element | JSX.Element[];
};

/**
 * @type {React.FC<{
 * title: string,
 * }>}
 */
export default function NavBar(props: Props): React.ReactNode {
	const { title, styles } = props;
	let newTitle: any = '';
	if (title && typeof title === 'string') {
		newTitle = <h1 className='mb-4'>{title}</h1>;
	}
	return (
		<>
			<header role='banner' className='text-light bg-secondary'>
				<nav
					role='navigation'
					className='flex items-center justify-center sm:justify-between flex-wrap gap-4 max-w-2xl m-auto p-4 text-center'
				>
					<NavLink to='/'>
						<span className='flex items-center gap-2 flex-wrap justify-center text-2xl'>
							<Svg icon='paw-print' className='text-4xl' />
							<p>Neighborhood Pet Manager</p>
						</span>
					</NavLink>

					<NavLink to='/create' className='rounded-full p-1 bg-primary'>
						<Svg label='Add a new pet' icon='plus' className='text-3xl' />
					</NavLink>
				</nav>
			</header>
			<main role='main' className={['max-w-2xl m-auto mb-8 p-4', styles].filter(Boolean).join(' ')}>
				{newTitle}
				{props.children}
			</main>
		</>
	);
}
