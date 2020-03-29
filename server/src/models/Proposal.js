// import db from '../db/db'
import { Model } from '../db/db'
import Client from './Client'

class Proposal extends Model {
    static get tableName() {
        return 'proposals';
      }
    
    static get relationMappings() {
        return {
            clients: {
                relation: Model.ManyToManyRelation,
                modelClass: Client,
                join: {
                    from: 'proposals.id',
                    through: {
                        from: 'clients_proposals.proposal_id',
                        to: 'clients_proposals.client_id'
                      },
                    to: 'clients.id'
                }
            }
        };
    }

    static async all(query) {
        try {
            return await this
                .query()
                .where(
                    'title',
                    'like',
                    '%' + (query.sort ? query.sort : '') + '%'
                )
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    
    static async findOne(id) {
        try {
            return await this.query().findById(id)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    static async store(proposal) {
        try {
            return await this.query().insert(proposal)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    static async save(proposal) {
        try {
            return await this.query().patchAndFetchById(proposal.id, proposal)
        } catch (error) {
            console.log(error)
            throw new Error('ERROR')
        }
    }

    static async deleteById(id) {
        return await this.query().deleteById(id);
    }
}

module.exports = Proposal;

// class Proposal {
//     constructor(data) {
//         if (!data) {
//             return
//         }

//         this.id = data.id
//         this.title = data.title
//         this.description = data.description
//     }

//     async all(request) {
//         try {
//             return await db('proposals')
//                 .select('*')
//                 .where(
//                     'title',
//                     'like',
//                     '%' + (request.sort ? request.sort : '') + '%'
//                 )
//         } catch (error) {
//             console.log(error)
//             throw new Error('ERROR')
//         }
//     }

//     async find(id) {
//         try {
//             let result = await findById(id)
//             if (!result) return {}
//             this.constructor(result)
//         } catch (error) {
//             console.log(error)
//             throw new Error('ERROR')
//         }
//     }

//     async store() {
//         try {
//             return await db('proposals').insert(this)
//         } catch (error) {
//             console.log(error)
//             throw new Error('ERROR')
//         }
//     }

//     async save(request) {
//         try {
//             return await db('proposals')
//                 .update(this)
//                 .where({ id: this.id })
//         } catch (error) {
//             console.log(error)
//             throw new Error('ERROR')
//         }
//     }

//     async destroy(request) {
//         try {
//             return await db('proposals')
//                 .delete()
//                 .where({ id: this.id })
//         } catch (error) {
//             console.log(error)
//             throw new Error('ERROR')
//         }
//     }
// }

// async function findById(id) {
//     try {
//         let [ProposalData] = await db('proposals')
//             .select('id', 'title', 'description')
//             .where({ id: id })
//         return ProposalData
//     } catch (error) {
//         console.log(error)
//         throw new Error('ERROR')
//     }
// }

// export { Proposal, findById }
