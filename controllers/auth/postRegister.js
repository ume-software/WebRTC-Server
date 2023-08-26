// 200
// 201
const User = require('../../models/user')
const bcrypt = require("bcryptjs")
// 204 400 401 409  403  404 500
const postRegister = async (req, res) => {
    try {
        const { username, mail, password } = req.body;

        const userExists = await User.exists({ mail: mail.toLowerCase() });

        if (userExists) {
            return res.status(409).send('E-mail already existed.');
        }
        // encrypt pass
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            mail: mail.toLowerCase(),
            password: password // encryptedPassword
        })

        //create JWT token
        const token = 'JWT token';

        res.status(201).json({
            userDetails: {
                mail: user.mail,
                username: user.username,
                token: token,
            }
        })

    } catch (err) {
        return res.status(500).send("Error occured. Please try again");

    }
}

module.exports = postRegister;