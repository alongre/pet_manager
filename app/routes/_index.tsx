import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams } from '@remix-run/react';
import db from '~/services/db';
import Card from '~/components/Card';
import Grid from '~/components/Grid';
import NavBar from '~/layouts/NavBar';
import { Btn, Input } from '~/components';

export const meta: V2_MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

// function to get
export async function loader({ request }: LoaderArgs) {
	const url = new URL(request.url);
	const query = url.searchParams;
	const options = {} as any;

	if (query.get('search')) {
		options.where = {
			name: {
				contains: query.get('search'),
				mode: 'insensitive',
			},
		};
	}

	const pets = await db.pet.findMany(options);
	return {
		data: pets,
	};
}

export default function Index() {
	const { data: pets } = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
	return (
		<NavBar title='Pets'>
			<Form className='grid sm:flex justify-between py-4 gap-4 items-end'>
				<Input
					name='search'
					label='Search'
					id='search'
					className='flex-grow'
					defaultValue={searchParams.has('search') || ''}
				/>
				<Btn type='submit'>Search</Btn>
			</Form>
			<Grid
				items={pets.map((pet) => (
					<Card to={`/pet/${pet.id}`} key={pet.name} title={pet.name} type={pet.type}></Card>
				))}
			></Grid>
		</NavBar>
	);
}
