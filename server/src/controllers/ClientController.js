import joi from 'joi'
import sgMail from '@sendgrid/mail'
import dateFormat from 'date-fns/format'
import  Client from '../models/Client'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const clientSchema = joi.object({
    id: joi.number().integer(),
    fullName: joi
        .string()
        .min(1)
        .max(60)
        .required(),
    email: joi
        .string()
        .email()
        .required(),
    phone: joi
        .string()
        .min(8)
        .max(12)
        .required(),
    status: joi
        .string()
        .required()
        .valid('NEW', 'IN_PROGRESS', 'DONE'),
    proposals: joi
        .array()
        .required()
})

class ClientController {
    async index(ctx) {
        const query = ctx.query
        if (!query.page || !query.limit) {
            ctx.throw(400, 'INVALID_ROUTE_OPTIONS')
        }

        try {
            const data = await Client.all(query)
            ctx.body = data.results;
            ctx.set('Total', data.total);
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async show(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')
        try {
            ctx.body = await Client.findOne(params.id)
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async create(ctx) {
        const client = ctx.request.body
        client.status = 'NEW';
        const validator = joi.validate(client, clientSchema)
        if (validator.error) ctx.throw(400, validator.error.details[0].message)

        try {
            const data = await Client.store(client)
            ctx.body = { message: 'SUCCESS', id: data.id }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async update(ctx) {
        const params = ctx.params
        const client = ctx.request.body

        if (!params.id) ctx.throw(400, 'INVALID_DATA')
        client.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        client.id = params.id
        try {
            const data = await Client.update(client)
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
            const data = await Client.deleteById(params.id);
            ctx.body = { message: 'SUCCESS', data: data }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default ClientController
