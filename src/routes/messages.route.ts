import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import messageRepository from '../repositories/message.repository';

const messagesRoute = Router();

messagesRoute.get('/messages', async (req: Request, res: Response, next: NextFunction) => {
    const messages = await messageRepository.findAllmessages();
    res.status(StatusCodes.OK).send(messages);
});

messagesRoute.get('/messages/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const message = await messageRepository.findById(id);
        res.status(StatusCodes.OK).send(message);
    } catch (error) {
        next(error);
    }
});

messagesRoute.post('/messages', async (req: Request, res: Response, next: NextFunction) => {
    const newMessage = req.body;
    const id = await messageRepository.create(newMessage);
    res.status(StatusCodes.CREATED).send(id);
});

messagesRoute.put('/messages/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const modifiedMessage = req.body;

    modifiedMessage.uuid = id;

    await messageRepository.update(modifiedMessage);

    res.status(StatusCodes.OK).send();
});

messagesRoute.delete('/message/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await messageRepository.remove(id);
    res.sendStatus(StatusCodes.OK);
});

export default messagesRoute;
