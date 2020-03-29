import joi from 'joi'
import sgMail from '@sendgrid/mail'
import dateFormat from 'date-fns/format'
import Proposal  from '../models/Proposal'
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
        try {
            let result = await Proposal.all(query)
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async show(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')
        try {
            ctx.body = await Proposal.findOne(params.id)
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async create(ctx) {
        const proposal = ctx.request.body

        const validator = joi.validate(proposal, proposalSchema)
        if (validator.error) ctx.throw(400, validator.error.details[0].message)

        try {
            let data = await Proposal.store(proposal)
            ctx.body = { message: 'SUCCESS', id: data.id }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async update(ctx) {
        const params = ctx.params
        const proposal = ctx.request.body

        //Make sure they've specified a client
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        //Add the updated date value
        proposal.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        proposal.id = params.id

        try {
            const data = await Proposal.save(proposal)
            ctx.body = { message: 'SUCCESS', data: data }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async delete(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        try {
            const data = await Proposal.deleteById(params.id)
            ctx.body = { message: 'SUCCESS', data: data }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default ProposalController
