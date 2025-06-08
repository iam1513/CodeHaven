export const pingController = async (req, res) => {
    return res.json({
        "message": "Pong",
    });
}