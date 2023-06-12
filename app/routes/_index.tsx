import type { V2_MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Card from '~/components/Card';
import Grid from '~/components/Grid';
import Navigation from '~/layouts/Navigation';

export const meta: V2_MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export function loader() {
	return {
		data: [
			{ name: 'Nugget', type: 'dog' },
			{ name: 'Thor', type: 'dog' },
			{ name: 'Mittens', type: 'cat' },
		],
	};
}

export default function Index() {
	const { data: pets } = useLoaderData<typeof loader>();
	return (
		<Navigation title='Pets'>
			<Grid
				items={pets.map((pet) => (
					<Card key={pet.name} title={pet.name} type={pet.type}></Card>
				))}
			></Grid>
		</Navigation>
	);
}
