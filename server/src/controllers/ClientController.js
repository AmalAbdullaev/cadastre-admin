import joi from 'joi'
import sgMail from '@sendgrid/mail'
import dateFormat from 'date-fns/format'
import { Client } from '../models/Client'
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
})


class ClientController {
    async index(ctx) {
        const query = ctx.query

        //Init a new client object
        const client = new Client()

        //Let's check that the sort options were set. Sort can be empty
        if (!query.page || !query.limit) {
            ctx.throw(400, 'INVALID_ROUTE_OPTIONS')
        }

        //Get paginated clients of clients
        try {
            let result = await client.all(query)
            console.log(result);
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    async show(ctx) {
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        //Initialize client
        const client = new Client()

        try {
            //Find and show client
            await client.find(params.id)
            ctx.body = client
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async create(ctx) {
        const request = ctx.request.body

        //Attach logged in user
        const client = new Client(request)

        //Validate the newly created client
        const validator = joi.validate(client, clientSchema)
        if (validator.error) ctx.throw(400, validator.error.details[0].message)

        try {
            let result = await client.store()
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

        //Find and set that client
        const client = new Client()
        await client.find(params.id)
        if (!client) ctx.throw(400, 'INVALID_DATA')


        //Add the updated date value
        client.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

        //Replace the client data with the new updated client data
        Object.keys(ctx.request.body).forEach(function(parameter, index) {
            client[parameter] = request[parameter]
        })

        try {
            await client.save()
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
        const client = new Client()
        await client.find(params.id)
        if (!client) ctx.throw(400, 'INVALID_DATA')

        try {
            await client.destroy()
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default ClientController
