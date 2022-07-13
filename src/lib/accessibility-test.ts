import path from 'path'
import { accessibility } from './accesibility'; 

describe('audit example', () => {
    it('passes', async () => {
        const uri = path.join(__dirname, './test/passes.html');
        const res = await accessibility (uri);
    expect(res.ok).toBe(true);
    });
}
) 