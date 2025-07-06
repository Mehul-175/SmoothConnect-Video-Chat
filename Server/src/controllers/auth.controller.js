export const signup = async (req, res) => {
    const { email, password, username } = req.body;
    res.send("signup")
}

export const login = async (req, res) => {
    res.send("login")
}

export const logout = (req, res) => {
    res.send("logout")
}