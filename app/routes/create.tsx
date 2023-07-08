import { redirect } from '@remix-run/node';
import NavBar from '~/layouts/NavBar';
import type { ActionArgs } from '@remix-run/node';
import { z } from 'zod';
import db from '~/services/db';
import { Input, Btn } from '~/components';
import { Form, Link } from '@remix-run/react';

const types = ['dog', 'cat', 'bird', 'reptile', 'fish', 'bunny', 'other'] as const;
export const typeOptions = types.map((type) => {
	return {
		label: type.charAt(0).toUpperCase() + type.slice(1),
		value: type,
	};
});

export const petSchema = z.object({
	name: z.string().min(1),
	type: z.enum(types),
	birthday: z.preprocess((v) => {
		return v ? new Date(v) : undefined;
	}, z.date().optional()),
});

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();
	const body = Object.fromEntries(formData.entries());

	const { error, success, data } = petSchema.safeParse(body);
	if (!success) {
		throw new Response('Not Allowed', { status: 400 });
	}

	// Add pet to DB

	await db.pet.create({
		data,
	});

	return redirect('/');

	// redirect back home
}

export default function () {
	return (
		<NavBar title='Create'>
			<Form method='POST' className='grid gap-4'>
				<Input name='name' label='Name' id='name' required />
				<Input name='type' label='Type' id='type' type='select' options={['', ...typeOptions]} defaultValue='dog' />

				{/* <Input name='photo' label='Photo' id='photo' type='file' /> */}

				<Input name='birthday' label='Birthday' id='birthday' type='date' />

				<div className='flex items-center justify-between'>
					<Btn type='submit'>Add a pet</Btn>
					<Link to='/'>Cancel</Link>
				</div>
			</Form>
		</NavBar>
	);
}
