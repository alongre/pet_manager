import { LoaderArgs, ActionArgs, Response } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { Btn, Input, Dialog } from '~/components';
import NavBar from '~/layouts/NavBar';
import db from '~/services/db';
import { petSchema, typeOptions } from './create';

export async function loader({ params }: LoaderArgs) {
	console.log({ params });
	const id = params.petId;
	const pet = await db.pet.findFirst({
		where: {
			id,
		},
	});
	if (!pet) {
		throw new Response('Not Allowed', {
			status: 404,
		});
	}
	return {
		data: pet,
	};
}

export async function action({ request, params }: ActionArgs) {
	const formData = await request.formData();
	const body = Object.fromEntries(formData.entries());

	const { error, success, data } = petSchema.safeParse(body);
	await new Promise((r) => setTimeout(r, 1000));

	if (!success) {
		throw new Response('Not Allowed', { status: 400 });
	}

	const id = params.petId;
	// UPDATE Pet
	const pet = await db.pet.update({
		where: {
			id,
		},
		data,
	});

	return { data: pet };
}

export default function PetId() {
	const { data: pet } = useLoaderData<typeof loader>();
	const navigation = useNavigation();

	console.log({ navigation });
	return (
		<NavBar title={navigation.state === 'submitting' ? navigation.formData.get('name') : pet?.name}>
			<div className='border-2 rounded p-4 bg-white'>
				<Form method='POST' className='grid gap-4'>
					<Input name='name' label='Name' id='name' defaultValue={pet?.name} required />
					<Input name='type' label='Type' id='type' defaultValue={pet?.type} required options={['', ...typeOptions]} />
					<Input
						name='birthday'
						label='Birthday'
						id='birthday'
						type='date'
						defaultValue={pet?.birthday ? new Date(pet?.birthday).toISOString().split('T')[0] : ''}
					/>
					<div>
						<Btn type='submit'>Update Pet</Btn>
					</div>
				</Form>

				<Dialog id='delete-modal' toggle='Delete' className='p-4'>
					<p className='p-2'>Are you sure you want to delete this pet?</p>
					<Form action={`/pet/${pet?.id}/delete`} method='POST'>
						<Btn type='submit'>Yes</Btn>
					</Form>
				</Dialog>
			</div>
		</NavBar>
	);
}
