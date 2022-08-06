import express from 'express'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let urls = {}

app.get('/:id', (req, res) => {
    let id = req.params.id;

    if(id in urls) {
        res.redirect(urls[id]);

        return;
    }

    res.status(406);

    res.send({
        msg: "Invalid ID!"
    });
});

app.post('/create', (req, res) => {

    let url = req.body.url;
    let urlId = req.body.customUrl;

    if(url === undefined || null) {
        res.status(400);

        res.send({
            msg: "Url is not provide"
        });

        return;
    }

    if(!checkSafeUrl(url)) {
        res.status(400);

        res.send({
            msg: "Url is not valid"
        });

        return;
    }

    if(urlId === undefined || null) {
        while(true) {
            urlId = createUrlId();

            if(urlId in urls) {
                continue;
            }
    
            break;
        }
    } else {
        if(!checkSafeCustomUrl(urlId)) {
            res.status(400);

            res.send({
                msg: "Url is not valid"
            });

            return;
        }

        if(urlId in urls) {
            res.status(406);

            res.send({
                msg: "ID is already taken"
            });

            return;
        }

    }

    saveUrl(url, urlId);

    res.status(200);

    res.send({
        msg: "Url created",
        id: urlId
    });

    return;
});

app.listen(3000, () => {
    console.log("app listening");
});

function saveUrl(url, id) {
    urls[id] = url;
}

function createUrlId() {
    const code = () => {
        return Math.random().toString(36).substring(2, 15);
    }

    return code() + code();
}

function checkSafeUrl(url) {
    let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    if(!regex.test(url) || url.length > 2000) {
        return false;
    }

    return true;
}

function checkSafeCustomUrl(customUrl) {
    let regex = /^[a-zA-Z0-9]+$/gm;
    if(!regex.test(customUrl) || customUrl.length > 30) {
        return false;
    }

    return true;
}