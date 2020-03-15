import Router from 'koa-router'
import jwt from '../middleware/jwt'
import logger from '../logs/log'

import ProposalController from '../controllers/proposalController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

const proposalController = new ProposalController()

router.get('/api/v1/proposals', jwtMiddleware, async (ctx, next) => {
    await proposalController.index(ctx)
})

router.post('/api/v1/proposals', jwtMiddleware, async (ctx, next) => {
    await proposalController.create(ctx)
})

router.get('/api/v1/proposals/:id', jwtMiddleware, async (ctx, next) => {
    await proposalController.show(ctx)
})

router.put('/api/v1/proposals/:id', jwtMiddleware, async (ctx, next) => {
    await proposalController.update(ctx)
})

router.delete('/api/v1/proposals/:id', jwtMiddleware, async (ctx, next) => {
    await proposalController.delete(ctx)
})

export default router
