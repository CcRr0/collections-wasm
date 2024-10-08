use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use std::collections::BinaryHeap;

use crate::heap_item::Item;

#[wasm_bindgen]
pub struct Heap32_1 {
    heap: BinaryHeap<Item<i32>>,
}

#[wasm_bindgen]
impl Heap32_1 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            heap: BinaryHeap::new(),
        }
    }

    #[wasm_bindgen]
    pub fn reserve(&mut self, additional: usize) -> () {
        self.heap.reserve(additional);
    }

    #[wasm_bindgen]
    pub fn peek_unwrap(&self) -> JsValue {
        self.heap.peek().unwrap().value.clone()
    }

    #[wasm_bindgen]
    pub fn push(&mut self, value: JsValue, key: i32) -> () {
        self.heap.push(Item { key, value });
    }

    #[wasm_bindgen]
    pub fn pop_unwrap(&mut self) -> JsValue {
        self.heap.pop().unwrap().value
    }

    #[wasm_bindgen]
    pub fn clear(&mut self) -> () {
        self.heap.clear();
    }
}
