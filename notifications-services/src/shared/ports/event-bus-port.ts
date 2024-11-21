export interface EventBusPort {
    publishEvent(queue: string, message: object): Promise<void>;
  }
  