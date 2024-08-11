use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

#[wasm_bindgen]
pub struct Vector {
    vec: Vec<JsValue>,
}

#[wasm_bindgen]
impl Vector {
    #[wasm_bindgen(constructor)]
    pub fn new(value: JsValue, size: usize) -> Self {
        Self {
            vec: vec![value; size],
        }
    }

    #[wasm_bindgen]
    pub fn len(&self) -> usize {
        self.vec.len()
    }

    #[wasm_bindgen]
    pub fn is_empty(&self) -> bool {
        self.vec.is_empty()
    }

    #[wasm_bindgen]
    pub fn reserve(&mut self, additional: usize) -> () {
        self.vec.reserve(additional);
    }

    #[wasm_bindgen]
    pub fn get(&self, index: usize) -> JsValue {
        self.vec[index].clone()
    }

    #[wasm_bindgen]
    pub fn set(&mut self, index: usize, value: JsValue) -> () {
        self.vec[index] = value;
    }

    #[wasm_bindgen]
    pub fn push(&mut self, value: JsValue) -> () {
        self.vec.push(value);
    }

    #[wasm_bindgen]
    pub fn pop_unwrap(&mut self) -> JsValue {
        self.vec.pop().unwrap()
    }
}
