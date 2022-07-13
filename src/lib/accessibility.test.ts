import path from 'path'
import { accessibility } from './accesibility'; 

describe('audit example', () => {
    it('passes', async () => {
        // const uri = 'https://github.com/canada-ca/digital-standards-self-assessment/blob/main/ui/public/index.html';
        // const uri = 'file://users/adimakkar/Desktop/haibun-module/test/passes.html'; // hosted - actual site?
        const uri = 'file:test/passes.html';
        console.log (uri);
        const res = await accessibility (uri);
    expect(res.ok).toBe(true);
    });
}
) 