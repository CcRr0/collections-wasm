use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "node:process")]
extern "C" {
    #[wasm_bindgen(js_namespace = stdout, js_name = "write")]
    fn js_stdout_write(buffer: Vec<u8>);
}

#[wasm_bindgen]
pub struct Writer {
    buffer: Vec<u8>,
    capacity: usize,
}

#[wasm_bindgen]
impl Writer {
    #[wasm_bindgen(constructor)]
    pub fn new(capacity: usize) -> Self {
        Self {
            buffer: Vec::with_capacity(capacity),
            capacity,
        }
    }

    #[inline(always)]
    fn write(&mut self, data: &[u8]) -> () {
        self.buffer.extend_from_slice(data);
    }

    #[inline(always)]
    fn try_write(&mut self, data: &[u8]) -> () {
        self.flush_if_overflow(data.len());
        self.write(data);
    }

    #[inline(always)]
    fn flush_if_overflow(&mut self, size: usize) -> () {
        if self.buffer.len() + size > self.capacity {
            self.flush()
        }
    }

    #[wasm_bindgen]
    #[inline(always)]
    pub fn flush(&mut self) -> () {
        js_stdout_write(std::mem::take(&mut self.buffer));
        self.buffer.reserve_exact(self.capacity);
    }

    #[wasm_bindgen]
    pub fn destructive_flush(self) -> () {
        js_stdout_write(self.buffer);
    }

    #[wasm_bindgen]
    pub fn write_byte(&mut self, byte: u8) -> () {
        self.flush_if_overflow(1);
        self.buffer.push(byte);
    }

    #[wasm_bindgen]
    pub fn write_string(&mut self, st: String) -> () {
        self.try_write(st.as_bytes());
    }

    #[wasm_bindgen]
    pub fn write_u32(&mut self, n: u32) -> () {
        self.try_write(&Self::conv_u32(n));
    }

    #[wasm_bindgen]
    pub fn write_u64(&mut self, n: u64) -> () {
        self.try_write(&Self::conv_u64(n));
    }

    #[wasm_bindgen]
    pub fn write_i32(&mut self, n: i32) -> () {
        let conv: Vec<u8> = Self::conv_u32(n.abs() as u32);
        self.flush_if_overflow(conv.len() + if n < 0 { 1 } else { 0 });
        if n < 0 { self.buffer.push(45u8); }
        self.write(&conv);
    }

    #[wasm_bindgen]
    pub fn write_i64(&mut self, n: i64) -> () {
        let conv: Vec<u8> = Self::conv_u64(n.abs() as u64);
        self.flush_if_overflow(conv.len() + if n < 0 { 1 } else { 0 });
        if n < 0 { self.buffer.push(45u8); }
        self.write(&conv);
    }

    #[inline(always)]
    fn conv_u32(mut n: u32) -> Vec<u8> {
        let mut index: usize = if n == 0 { 0 } else { n.ilog10() as usize };
        let mut bytes: Vec<u8> = vec![0u8; index + 1];
        loop {
            bytes[index] = (n % 10) as u8 + 48u8;
            if index == 0 { break; }
            index -= 1;
            n /= 10;
        }
        bytes
    }

    #[inline(always)]
    fn conv_u64(mut n: u64) -> Vec<u8> {
        let mut index: usize = if n == 0 { 0 } else { n.ilog10() as usize };
        let mut bytes: Vec<u8> = vec![0u8; index + 1];
        loop {
            bytes[index] = (n % 10) as u8 + 48u8;
            if index == 0 { break; }
            index -= 1;
            n /= 10;
        }
        bytes
    }
}
