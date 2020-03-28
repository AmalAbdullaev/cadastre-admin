import db from '../db/db'
class ClientProposal {
    constructor(data) {
        if (!data) {
            return
        }

        this.clientId = data.clientId;
        this.proposals = data.proposals;
    }

    async save(request) {
        for( const proposal of this.proposals) {
            try {
                // console.log(proposalId);
                // ClientProposal_.forge().save({'client_id': this.clientId, 'proposal_id': proposalId }).then((model) => {
                //     console.log(model);
                // })
                console.log(proposal);
                await db('clients_proposals')
                    .insert({'client_id': this.clientId, 'proposal_id': proposal.id })
            } catch (error) {
                console.log(error)
                throw new Error('ERROR')
            };
        }
    }
}

export { ClientProposal }
