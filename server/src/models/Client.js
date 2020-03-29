import { Model } from '../db/db'
import Proposal from './Proposal'
import { UniqueViolationError } from 'objection';


class Client extends Model {
    static get tableName() {
        return 'clients';
      }
    
    static get relationMappings() {
        return {
            proposals: {
                relation: Model.ManyToManyRelation,
                modelClass: Proposal,
                join: {
                    from: 'clients.id',
                    through: {
                        from: 'clients_proposals.client_id',
                        to: 'clients_proposals.proposal_id'
                      },
                    to: 'proposals.id'
                }
            }
        };
    }

    static async all(query) {
        const clients =  await this
            .query()
            .withGraphFetched('proposals')
            .where(
                'fullName',
                'like',
                '%' + (query.sort ? query.sort : '') + '%'
            )
            .page(query.page, query.limit)
        return clients
    }

    static async store(client) {
        const newClient = await this.query().insert(client);
        for(let proposalId of client.proposals) {
            try{
                await this.relatedQuery('proposals').for(newClient.id).relate(proposalId)
            } catch(err) {
                if(!(err instanceof UniqueViolationError)){
                    throw err;
                }
            }
        }

        return newClient
    }

    static async update(client) {
        await this.relatedQuery('proposals').for(client.id).unrelate()
        for(let proposalId of client.proposals) {
            try{
                await this.relatedQuery('proposals').for(client.id).relate(proposalId)
            } catch(err) {
                if(!(err instanceof UniqueViolationError)){
                    throw err;
                }
            }
        }
        return await this.query().patchAndFetchById(client.id, client)
    }

    static async findOne(id) {
        const client = await this.query().findById(id)
        const proposals = await client.$relatedQuery('proposals')
        client.proposals = proposals;
        return client;
    }

    static async deleteById(id) {
        return await this.query().deleteById(id);
    }
}
module.exports = Client;
