import amqp from 'amqplib';
import { EventBusPort } from '../ports/event-bus-port';

export class RabbitMQEventBusAdapter implements EventBusPort {
    private readonly connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    async publishEvent(queue: string, message: object): Promise<void> {
        const connection = await amqp.connect(this.connectionString);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        console.log(`Evento publicado en la cola ${queue}:`, message);
        await channel.close();
        await connection.close();
    }

    async consumeEvent(queue: string, callback: (message: any) => void): Promise<void> {
        const connection = await amqp.connect(this.connectionString);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue);
        console.log(`Esperando eventos en la cola ${queue}...`);

        channel.consume(queue, (msg) => {
            if (msg) {
                const content = JSON.parse(msg.content.toString());
                callback(content);
                channel.ack(msg);
            }
        });
    }
}
