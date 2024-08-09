use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "node:fs")]
extern "C" {
    #[wasm_bindgen(js_name = "readFileSync")]
    fn js_read_file_sync(descriptor: u8) -> Vec<u8>;
}

#[wasm_bindgen]
pub struct Reader {
    buffer: Vec<u8>,
    index: usize,
}

#[wasm_bindgen]
impl Reader {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            buffer: js_read_file_sync(0),
            index: 0,
        }
    }

    #[inline(always)]
    fn read(&mut self) -> u8 {
        self.index += 1;
        self.buffer[self.index - 1]
    }

    #[inline(always)]
    fn trim(&mut self) -> u8 {
        let mut cur: u8 = self.read();
        while cur == 10u8 || cur == 32u8 {
            cur = self.read();
        }
        cur
    }

    #[wasm_bindgen]
    pub fn read_line(&mut self) -> String {
        todo!()
    }

    #[wasm_bindgen]
    pub fn read_string(&mut self) -> String {
        todo!()
    }

    #[wasm_bindgen]
    pub fn read_u32(&mut self) -> u32 {
        let mut cur: u8 = self.trim();
        let mut res: u32 = 0;
        while cur & 16u8 != 0 {
            res = res * 10 + (cur - 48u8) as u32;
            cur = self.read();
        }
        res
    }

    #[wasm_bindgen]
    pub fn read_u64(&mut self) -> u64 {
        let mut cur: u8 = self.trim();
        let mut res: u64 = 0;
        while cur & 16u8 != 0 {
            res = res * 10 + (cur - 48u8) as u64;
            cur = self.read();
        }
        res
    }

    #[inline(always)]
    fn trim_sgn(&mut self) -> (u8, bool) {
        let mut cur: u8 = self.trim();
        let sgn: bool = if cur == 45u8 {
            cur = self.read();
            false
        } else { true };
        (cur, sgn)
    }

    #[wasm_bindgen]
    pub fn read_i32(&mut self) -> i32 {
        let (mut cur, sgn): (u8, bool) = self.trim_sgn();
        let mut res: i32 = 0;
        while cur & 16u8 != 0 {
            res = res * 10 + (cur - 48u8) as i32;
            cur = self.read();
        }
        if sgn { res } else { -res }
    }

    #[wasm_bindgen]
    pub fn read_i64(&mut self) -> i64 {
        let (mut cur, sgn): (u8, bool) = self.trim_sgn();
        let mut res: i64 = 0;
        while cur & 16u8 != 0 {
            res = res * 10 + (cur - 48u8) as i64;
            cur = self.read();
        }
        if sgn { res } else { -res }
    }
}
