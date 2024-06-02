import User from '@models/User'
import connect from '@utils/db'
import { NextResponse } from 'next/server'

export const PUT = async (req: any, { params }: any) => {
	const { email } = await params
	const { name } = await req.json()

	await connect()

	try {
		await User.findOneAndUpdate({ email }, { name })
		return new NextResponse('updated', { status: 200 })
	} catch (err: any) {
		return new NextResponse(err, {
			status: 500,
		})
	}
}
