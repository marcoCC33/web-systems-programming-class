import { Request, Response } from 'express';
import { pool } from '../conf/dbConnection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// ID is a positive and safe integer
const isValidId = (id: any): boolean => {
    const num = Number(id);
    return Number.isSafeInteger(num) && num > 0;
};

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        // Validate query
        const { active } = req.query;
        if (active !== undefined && String(active).toLowerCase() !== 'true') {
            return res.status(400).json({ ok: false, message: 'The active parameter only accepts the value true.' });
        }

        const query = 'SELECT * FROM products WHERE active = TRUE';
        const [rows] = await pool.query<RowDataPacket[]>(query);
        
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error en getAllProducts:', error);
        return res.status(500).json({ ok: false, message: 'Internal server error.' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({ ok: false, message: 'ID must be a valid positive integer.' });
        }

        const query = 'SELECT * FROM products WHERE id = ? AND active = TRUE';
        const [rows] = await pool.query<RowDataPacket[]>(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ ok: false, message: 'Product not found or is inactive.' });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error en getProductById:', error);
        return res.status(500).json({ ok: false, message: 'Internal server error.' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, stock, description, brand, img } = req.body;

        // Validations
        if (typeof name !== 'string' || name.trim() === '' || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ ok: false, message: 'Name and description are required and must be text.' });
        }
        if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
            return res.status(400).json({ ok: false, message: 'Price must be a number greater than zero.' });
        }
        if (!Number.isSafeInteger(stock) || stock < 0) {
            return res.status(400).json({ ok: false, message: 'Stock has to be a whole number greater than or equal to zero.' });
        }

        const query = 'INSERT INTO products (name, price, stock, description, brand, img) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [name, price, stock, description, brand || null, img || null];

        // ResultSetHeader
        const [result] = await pool.query<ResultSetHeader>(query, values);

        return res.status(201).json({ 
            ok: true, 
            message: 'Product created successfully.', 
            productId: result.insertId 
        });
    } catch (error) {
        console.error('Error en createProduct:', error);
        return res.status(500).json({ ok: false, message: 'Internal server error.' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({ ok: false, message: 'El ID debe ser un entero positivo válido.' });
        }

        const { name, price, stock, description, brand, img } = req.body;

        if (typeof name !== 'string' || name.trim() === '' || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ ok: false, message: 'Name and description are required and must be text.' });
        }
        if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
            return res.status(400).json({ ok: false, message: 'Price must be a number greater than zero.' });
        }
        if (!Number.isSafeInteger(stock) || stock < 0) {
            return res.status(400).json({ ok: false, message: 'Stock must be an integer greater than or equal to zero.' });
        }

        const query = `
            UPDATE products 
            SET name = ?, price = ?, stock = ?, description = ?, brand = ?, img = ?
            WHERE id = ? AND active = TRUE
        `;
        const values = [name, price, stock, description, brand || null, img || null, id];

        const [result] = await pool.query<ResultSetHeader>(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, message: 'Product not found or is inactive.' });
        }

        return res.status(200).json({ ok: true, message: 'Product succesfully updated.' });
    } catch (error) {
        console.error('Error en updateProduct:', error);
        return res.status(500).json({ ok: false, message: 'Internal server error.' });
    }
};

export const changePrice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({ ok: false, message: 'ID must be a valid positive integer.' });
        }

        // Reject if it has anything other than price
        const keys = Object.keys(req.body);
        if (keys.length !== 1 || !keys.includes('price')) {
            return res.status(400).json({ ok: false, message: 'Body of the request should only contain the price property.' });
        }

        const { price } = req.body;
        if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
            return res.status(400).json({ ok: false, message: 'Price is invalid.' });
        }

        const query = 'UPDATE products SET price = ? WHERE id = ? AND active = TRUE';
        const [result] = await pool.query<ResultSetHeader>(query, [price, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, message: 'Product not found or is inactive.' });
        }

        return res.status(200).json({ ok: true, message: 'Price successfully updated.' });
    } catch (error) {
        console.error('Error en changePrice:', error);
        return res.status(500).json({ ok: false, message: 'Internal server error.' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({ ok: false, message: 'ID must be a valid positive integer.' });
        }

        const query = 'UPDATE products SET active = FALSE WHERE id = ? AND active = TRUE';
        const [result] = await pool.query<ResultSetHeader>(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, message: 'Product not found or already discontinued.' });
        }

        return res.status(200).json({ ok: true, message: 'Product successfully discontinued' });
    } catch (error) {
        console.error('Error en deleteProduct:', error);
        return res.status(500).json({ ok: false, message: 'Internal server error.' });
    }
};