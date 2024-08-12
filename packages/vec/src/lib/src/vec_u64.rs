use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct UInt64Vector {
    vec: Vec<u64>,
}

#[wasm_bindgen]
impl UInt64Vector {
    #[wasm_bindgen(constructor)]
    pub fn new(value: u64, size: usize) -> Self {
        Self {
            vec: vec![value; size],
        }
    }

    #[wasm_bindgen]
    pub fn reserve(&mut self, additional: usize) -> () {
        self.vec.reserve(additional);
    }

    #[wasm_bindgen]
    pub fn get(&self, index: usize) -> u64 {
        self.vec[index]
    }

    #[wasm_bindgen]
    pub fn set(&mut self, index: usize, value: u64) -> () {
        self.vec[index] = value;
    }

    #[wasm_bindgen]
    pub fn push(&mut self, value: u64) -> () {
        self.vec.push(value);
    }

    #[wasm_bindgen]
    pub fn pop_unwrap(&mut self) -> u64 {
        self.vec.pop().unwrap()
    }

    #[wasm_bindgen]
    pub fn sort(&mut self, rev: bool) -> () {
        if rev {
            self.vec.sort_unstable_by(|a, b| b.cmp(a));
        } else {
            self.vec.sort_unstable();
        }
    }

    #[wasm_bindgen]
    pub fn clear(&mut self) -> () {
        self.vec.clear();
    }
}
