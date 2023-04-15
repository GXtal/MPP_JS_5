require('dotenv').config()

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const authMiddleware = require('./middleware/auth-middleware')
const errorMiddleware = require('./middleware/error-middleware')

const {graphqlHTTP} = require("express-graphql");
const {userSchema, operatorSchema} = require('./schemas/index')

const app = express();
const port = normalizePort(process.env.PORT || '5000');


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/graphql/users', graphqlHTTP({
    graphiql: true,
    schema: userSchema
}))

app.use('/graphql/operator', authMiddleware, graphqlHTTP({
    graphiql: true,
    schema: operatorSchema
}))

app.use(errorMiddleware)

app.get("/api", (req, res) => {
    console.log('ssss');
    res.json({ "names": ["ex", "sah", "th"] });
});




app.listen(5000, () => { console.log('Listening on ' + port); });


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}
