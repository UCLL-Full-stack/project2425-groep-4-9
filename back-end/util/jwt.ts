import jwt from 'jsonwebtoken'

const generateJwtToken = ({ name, role }: { name: string; role: string }): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'labo_app' };
    try {
        return jwt.sign({ name, role }, secret, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

const extractRole = (req: any): string => {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    const payloadBase64 = token.split('.')[1]; 
    const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const payload = JSON.parse(decodedPayload); 
    const role = payload.role || null;

    return role
}

export {generateJwtToken, extractRole};