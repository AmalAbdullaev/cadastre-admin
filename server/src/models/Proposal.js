import db from '../db/db'
import rand from 'randexp'

class Proposal {
    constructor(data) {
        if (!data) {
            return
        }

        this.id = data.id
        this.title = data.title
        this.description = data.description
    }

    async all(request) {
        try {
            return await db('Proposals')
                .select('*')
                .where(
                    'title',
                    'like',
                    '%' + (request.sort ? request.sort : '') + '%'
                )
                .orderBy('createdAt', request.order)
                .offset(+request.page * +request.limit)
                .limit(+request.limit)
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
            return await db('Proposals').insert(this)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async save(request) {
        try {
            return await db('Proposals')
                .update(this)
                .where({ id: this.id })
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    async destroy(request) {
        try {
            return await db('Proposals')
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
        let [ProposalData] = await db('Proposals')
            .select('id', 'title', 'description')
            .where({ id: id })
        return ProposalData
    } catch (error) {
        console.log(error)
        throw new Error('ERROR')
    }
}

export { Proposal, findById }
