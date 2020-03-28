import Router from 'koa-router'
import jwt from '../middleware/jwt'

import ClientController from '../controllers/ClientController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

const clientController = new ClientController()

router.get('/api/v1/clients', jwtMiddleware, async (ctx, next) => {
    await clientController.index(ctx)
})

router.post('/api/v1/clients', jwtMiddleware, async (ctx, next) => {
    await clientController.create(ctx)
})

router.get('/api/v1/clients/:id', jwtMiddleware, async (ctx, next) => {
    await clientController.show(ctx)
})

router.put('/api/v1/clients/:id', jwtMiddleware, async (ctx, next) => {
    await clientController.update(ctx)
})

router.delete('/api/v1/clients/:id', jwtMiddleware, async (ctx, next) => {
    await clientController.delete(ctx)
})

router.post('/api/v1/clients/form', async (ctx, next) => {
    await clientController.create(ctx)
})

export default router
