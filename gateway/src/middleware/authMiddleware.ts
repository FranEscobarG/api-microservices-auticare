import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        res.status(401).json({ error: 'Token no proporcionado.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET); // Verificar el token
        (req as any).type = decoded; // Adjuntar el tipo de usuario decodificado a la solicitud

        next(); // Continuar
    } catch (err) {
        res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};