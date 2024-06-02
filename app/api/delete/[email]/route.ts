import User from '@models/User'
import connect from '@utils/db'
import { NextResponse } from 'next/server' 

export const DELETE = async (req: any, { params }: any) => {
	const { email } = await params

	await connect()

	try {
		await User.findOneAndDelete({ email })
		return new NextResponse('deleted', { status: 200 })
	} catch (err: any) {
		return new NextResponse(err, {
			status: 500,
		})
	}
}
