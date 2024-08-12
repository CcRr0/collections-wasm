use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Int32Vector {
    vec: Vec<i32>,
}

#[wasm_bindgen]
impl Int32Vector {
    #[wasm_bindgen(constructor)]
    pub fn new(value: i32, size: usize) -> Self {
        Self {
            vec: vec![value; size],
        }
    }

    #[wasm_bindgen]
    pub fn reserve(&mut self, additional: usize) -> () {
        self.vec.reserve(additional);
    }

    #[wasm_bindgen]
    pub fn get(&self, index: usize) -> i32 {
        self.vec[index]
    }

    #[wasm_bindgen]
    pub fn set(&mut self, index: usize, value: i32) -> () {
        self.vec[index] = value;
    }

    #[wasm_bindgen]
    pub fn push(&mut self, value: i32) -> () {
        self.vec.push(value);
    }

    #[wasm_bindgen]
    pub fn pop_unwrap(&mut self) -> i32 {
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
