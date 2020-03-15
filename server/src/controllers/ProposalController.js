import joi from 'joi'
import sgMail from '@sendgrid/mail'
import dateFormat from 'date-fns/format'
import { Proposal } from '../models/Proposal'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const proposalSchema = joi.object({
    id: joi.number().integer(),
    title: joi
        .string()
        .min(1)
        .max(60)
        .required(),
    description: joi
        .string()
        .required()
})


class ProposalController {
    async index(ctx) {
        const query = ctx.query
        const proposal = new Proposal()
        try {
            let result = await proposal.all(query)
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async show(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        const proposal = new Proposal()

        try {
            await proposal.find(params.id)
            ctx.body = proposal
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async create(ctx) {
        const request = ctx.request.body

        //Attach logged in user
        const proposal = new Proposal(request)

        const validator = joi.validate(proposal, proposalSchema)
        if (validator.error) ctx.throw(400, validator.error.details[0].message)

        try {
            let result = await proposal.store()
            ctx.body = { message: 'SUCCESS', id: result[0] }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async update(ctx) {
        const params = ctx.params
        const request = ctx.request.body

        //Make sure they've specified a client
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        const proposal = new Proposal()
        await proposal.find(params.id)
        if (!proposal) ctx.throw(400, 'INVALID_DATA')


        //Add the updated date value
        proposal.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

        Object.keys(ctx.request.body).forEach(function(parameter, index) {
            proposal[parameter] = request[parameter]
        })

        try {
            await proposal.save()
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async delete(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        //Find that client
        const proposal = new Proposal()
        await proposal.find(params.id)
        if (!proposal) ctx.throw(400, 'INVALID_DATA')

        try {
            await proposal.destroy()
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default ProposalController
