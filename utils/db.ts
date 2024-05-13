import mongoose from 'mongoose'

const connect = async () => {
	if (mongoose.connections[0].readyState) return

	try {
		await mongoose.connect(process.env.MONGO_URL!)
		console.log('Mongo conectado com sucesso.')
	} catch (error) {
		throw new Error('Erro ao tentar se conectar com o Mongo')
	}
}

export default connect