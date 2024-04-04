const jwt = require('jsonwebtoken');

// Función para generar un token de acceso
function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
}

// Función para generar un token de refresco
async function generateRefreshToken(user, res) {
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
   
    user.refreshToken = refreshToken;
    await user.save();

    // Almacenar el token de refresco en una cookie segura
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
}

// Función para manejar la renovación del token de acceso usando el token de refresco
exports.refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // Verificar el token de refresco...
    // Si es válido, generar un nuevo token de acceso y devolverlo al cliente
};
