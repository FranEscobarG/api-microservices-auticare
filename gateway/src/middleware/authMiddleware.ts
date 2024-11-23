import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).send({ error: 'Access denied. No token provided.' });
        return;  // Asegúrate de finalizar la ejecución aquí
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        (req as any).user = decoded;  // Usar 'as any' para evitar errores de tipo temporalmente

        console.log('Autenticación exitosa para el usuario:', (req as any).user);

        next();  
    } catch (ex) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};
