import User from '@models/User'
import connect from '@utils/db'
import { NextResponse } from 'next/server'

export const GET = async (req: any, { params }: any) => {
	const { email } = await params

	await connect()

	try {
		let data: any = await User.findOne({ email })
		return NextResponse.json(data)
	} catch (err: any) {
		return new NextResponse(err, {
			status: 500,
		})
	}
}
