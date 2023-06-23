import { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Navigation from '~/layouts/Navigation';
import db from '~/services/db';

export async function loader({ params }: LoaderArgs) {
	console.log({ params });
	const id = params.petId;
	const pet = await db.pet.findFirst({
		where: {
			id,
		},
	});
	return {
		data: pet,
	};
}

export default function PetId() {
	const { data } = useLoaderData<typeof loader>();
	return <Navigation title={data?.name}>test</Navigation>;
}
