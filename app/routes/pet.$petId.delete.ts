import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import db from '~/services/db';

export async function action({ params }: ActionArgs) {
	console.log('DELETE!!!');
	const id = params.petId;
	await db.pet.delete({
		where: {
			id,
		},
	});

	return redirect('/');
}
