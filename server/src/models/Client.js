import db from '../db/db'
import rand from 'randexp'

class Client {
    constructor(data) {
        if (!data) {
            return
        }

        this.id = data.id
        this.fullName = data.fullName
        this.email = data.email
        this.phone = data.phone
        this.status = data.status
    }

    async all(request) {
        try {
           let query = db('clients')
                .select('*')
                .where(
                    'fullName',
                    'like',
                    '%' + (request.sort ? request.sort : '') + '%'
                )
                .offset(+request.page * +request.limit)
                .limit(+request.limit)
            if(request.status) {
                query.where(
                    'status',
                    '=',
                    (request.status ? request.status : '') 
                )
            }

            return query;
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async find(id) {
        try {
            let result = await findById(id)
            if (!result) return {}
            this.constructor(result)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async store() {
        try {
            return await db('clients').insert(this)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async save(request) {
        try {
            return await db('clients')
                .update(this)
                .where({ id: this.id })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async destroy(request) {
        try {
            return await db('clients')
                .delete()
                .where({ id: this.id })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }
}

async function findById(id) {
    try {
        let [ClientData] = await db('clients')
            .select('id', 'fullName', 'email', 'phone', 'status')
            .where({ id: id })
        return ClientData
    } catch (error) {
        console.log(error)
        throw new Error('ERROR')
    }
}

export { Client, findById }
