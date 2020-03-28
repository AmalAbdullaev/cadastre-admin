import db from '../db/db'

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
           let query = await db('clients')
                .select('*')
                .where(
                    'fullName',
                    'like',
                    '%' + (request.sort ? request.sort : '') + '%'
                )
                .innerJoin('clients_proposals', 'clients.id', '=', 'clients_proposals.client_id')
                .options({nestTables: true})
                .innerJoin('proposals', 'proposals.id', '=', 'clients_proposals.proposal_id')
                .options({nestTables: true})
                .then(res => {
                    console.log(res);
                })
                // .offset(+request.page * +request.limit)
                // .limit(+request.limit)
            // if(request.status) {
            //     query.where(
            //         'status',
            //         '=',
            //         (request.status ? request.status : '') 
            //     )
            // }

            // let total = await db('clients').count({count: '*'})
            // return  {
            //     data: query,
            //     count: total[0].count
            // };
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
            .select('*')
            .where({ id: id })      
            .innerJoin('clients_proposals', 'clients.id', '=', 'clients_proposals.client_id')
            .innerJoin('proposals', 'proposals.id', '=', 'clients_proposals.proposal_id')
        return ClientData
    } catch (error) {
        console.log(error)
        throw new Error('ERROR')
    }
}

export { Client, findById }
