import axios from 'axios';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { checkAccessibility } from './lighthouse-accessibility';

class TestHttpServer {
    server: any;
    constructor() {
        this.server = createServer(async (req, res) => {
            if (req.url == '/passes.html') {
                const contents = readFileSync('./test/passes.html', 'utf-8');
                res.writeHead(200);
                res.end(contents)
            } else if (req.url == 'fails.html') {
            } else {
                throw Error(`no such path ${req.url}`)
            }
            res.end();
        });
    }
    listen() {
        this.server.listen(8080, 'localhost');
    }
    close() {
        this.server.close();
    }
}


jest.setTimeout(30000);
let server = new TestHttpServer();

type TLighthouseReport = {
    lhr: {
        audits: {
            [audit: string]: {
                score: number
            }
        }
    }
}

describe('test audits with local server ', () => {
    beforeAll(async () => {
        await server.listen();
        console.debug('server started');
    });
    afterAll(async () => {
        await server.close();
        console.debug('closed server');
    });
    it('gets test contents', async () => {
        const DOCTYPE = '<!DOCTYPE HTML>';
        const response = await axios.get('http://localhost:8080/passes.html');
        expect(response.data.substr(0, DOCTYPE.length)).toEqual(DOCTYPE);
    })
    it('passes', async () => {
        const uri = 'http://localhost:8080/passes.html';
        const res: TLighthouseReport = await checkAccessibility(uri);

        const scored = Object.entries(res.lhr.audits).filter(([audit, values]) => values.score !== null)
            .map(([audit, value]) => ({ audit, score: value.score }));

        expect(scored.every(({ score }) => score > 0)).toBe(true);
    });
})
