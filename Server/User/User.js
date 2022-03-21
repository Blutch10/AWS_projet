const { json } = require('express');
const session = require('express-session');

class User
{

    constructor(database)
    {
        this.database = database;
    }


    /**
     * Tries to add the user with the information provided in request body.
     * 
     * @param {Request} req The request object.
     * @param {Response} res The response object.
     */
    addUser(req, res)
    {
        let { username, firstname, lastname, email, password } = req.body;
        if (!username || !firstname || !lastname || !email || !password )
        {
            res.status(400).json({
                status: 400,
                message: "Invalid form"
            });
            return;
        }

        // ToDo : Ajouter le code de vérification des entrées de l'utilisateur

        // ToDo : Ajouter le code de calcul du hash et salt du mot de passe.

        this.database.existUsername(username)
            .then((val) => {
                if (val)
                    res.status(409).json({
                        status: 409,
                        message: "Username already taken"
                    });
                else
                {
                    this.database.addUser(username, firstname, lastname, email, password)
                        .then((val) => {
                            res.status(201).json({
                                status: 201,
                                message: "Account created"
                            });
                        })
                        .catch((err) => {
                            console.log(err);   // DEBUG
                            res.status(500).json({
                                status: 500,
                                message: "Database error"
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);   // DEBUG
                res.status(500).json({
                    status: 500,
                    message: "Database error"
                });
            });
    }


    /**
     * Deletes the account of the currently logged user.
     * 
     * @param {Request} req The request object.
     * @param {Response} res The response object.
     */
    deleteUser(req, res)
    {
        let id = req.session.userid;
        if (!id) // If the user is not logged in
        {
            res.status(401).json({
                status: 401,
                message: "Operation needs to be logged in"
            });
            return;
        }
        this.database.deleteUser(id)
            .then((val) => {
                if (val === true)
                    res.status(200).json({
                        status: 200,
                        message: "Account deleted"
                    });
                else
                res.status(400).json({
                    status: 200,
                    message: "Account doesn't exist"
                });
            })
            .catch((err) => {
                console.log(err);   // DEBUG
                res.status(500).json({
                    status: 500,
                    message: "Database error"
                });
            });
    }


    /**
     * Tries to log in the user.
     * 
     * @param {Request} req The request object.
     * @param {Response} res The response object.
     */
    login(req, res)
    {
        let { username, password } = req.body;
        if (!username || !password)
        {
            res.status(400).json({
                status: 400,
                message: "Invalid form"
            });
        }

         // ToDo : Ajouter le code de vérification des entrées de l'utilisateur

        this.database.checkLoginInformation(username, password)
            .then((val) => {
                if (val)
                {
                    req.session.regenerate(function (err) {
                        if (err)
                            res.status(500).json({
                                status: 500,
                                message: "Internal error"
                            });
                    });
                    req.session.userid = val;
                    res.status(200).json({
                        status: 200,
                        message: "Successful authentication"
                    });
                }
                else
                {
                    req.session.destroy((err) => { });
                    res.status(200).json({
                        status: 200,
                        message: "Failed authentication"
                    });
                }
            })
            .catch((err) => {
                console.log(err);   // DEBUG
                res.status(500).json({
                    status: 500,
                    message: "Database error"
                });
            });
    }


    /**
     * Destroys the session of the user.
     * 
     * @param {Request} req The request object.
     * @param {Response} res The response object.
     */
    logout(req, res)
    {
        req.session.destroy((err) => { 
            if (err)
                res.status(500).json({
                    status: 500,
                    message: "Erreur interne au serveur"
                });
            else {
                res.status(200).json({
                    status: 200,
                    message: "Successful logout"
                });
                
            }
        });
    }
}

exports.default = User;