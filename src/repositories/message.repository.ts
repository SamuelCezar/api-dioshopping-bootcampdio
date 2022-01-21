import db from '../db';
import DatabaseError from '../models/errors/database.error.model';
import Message from "../models/message.model";

class messageRepository {

    async findAllmessages(): Promise<Message[]> {
        const query = `
            SELECT id, email, message, created_at
            FROM messages
        `;

        const { rows } = await db.query<Message>(query);
        return rows || [];
    }

    async findById(id: string): Promise<Message> {
        try {
            const query = `
                SELECT id, email, message, created_at
                FROM messages
                WHERE uuid = $1
            `;
    
            const values = [id];
    
            const { rows } = await db.query<Message>(query, values);
            const [message] = rows;
    
            return message;
        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }
    }

    async create(message: Message): Promise<string> {
        const script = `
            INSERT INTO message (
                email,
                message,
                created_at
            )
            VALUES ($1, $2, $3)
            RETURNING id
        `;

        const values = [message.email, message.message, message.created_at];

        const { rows } = await db.query<{ id: string }>(script, values);
        const [newMessage] = rows;
        return newMessage.id;
    }

    async update(message: Message): Promise<void> {
        const script = `
            UPDATE messages 
            SET 
                email = $1,
                message = $2,
                created_at = $3,
            WHERE uuid = $4
        `;

        const values = [message.email, message.message, message.created_at, message.id];
        await db.query(script, values);
    }

    async remove(id: string): Promise<void> {
        const script = `
            DELETE
            FROM message
            WHERE id = $1
        `;
        const values = [id];
        await db.query(script, values);
    }

}

export default new messageRepository();
