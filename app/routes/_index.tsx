import type { V2_MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import db from '~/services/db';
import Card from '~/components/Card';
import Grid from '~/components/Grid';
import NavBar from '~/layouts/NavBar';

export const meta: V2_MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader() {
	const pets = await db.pet.findMany();
	return {
		data: pets,
	};
}

export default function Index() {
	const { data: pets } = useLoaderData<typeof loader>();
	return (
		<NavBar title='Pets'>
			<Grid
				items={pets.map((pet) => (
					<Card to={`/pet/${pet.id}`} key={pet.name} title={pet.name} type={pet.type}></Card>
				))}
			></Grid>
		</NavBar>
	);
}
