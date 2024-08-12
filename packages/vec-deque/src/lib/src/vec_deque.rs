use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use std::collections::VecDeque;

#[wasm_bindgen]
pub struct Deque {
    deque: VecDeque<JsValue>,
}

#[wasm_bindgen]
impl Deque {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            deque: VecDeque::new(),
        }
    }

    #[wasm_bindgen]
    pub fn reserve(&mut self, additional: usize) -> () {
        self.deque.reserve(additional);
    }

    #[wasm_bindgen]
    pub fn front_unwrap(&self) -> JsValue {
        self.deque.front().unwrap().clone()
    }

    #[wasm_bindgen]
    pub fn back_unwrap(&self) -> JsValue {
        self.deque.back().unwrap().clone()
    }

    #[wasm_bindgen]
    pub fn push_front(&mut self, value: JsValue) -> () {
        self.deque.push_front(value);
    }

    #[wasm_bindgen]
    pub fn push_back(&mut self, value: JsValue) -> () {
        self.deque.push_back(value);
    }

    #[wasm_bindgen]
    pub fn pop_front_unwrap(&mut self) -> JsValue {
        self.deque.pop_front().unwrap().clone()
    }

    #[wasm_bindgen]
    pub fn pop_back_unwrap(&mut self) -> JsValue {
        self.deque.pop_back().unwrap().clone()
    }
}
