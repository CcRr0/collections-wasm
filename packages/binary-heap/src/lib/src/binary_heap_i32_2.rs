use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use std::collections::BinaryHeap;

use crate::heap_item::Item;

#[wasm_bindgen]
pub struct Heap32_2 {
    heap: BinaryHeap<Item<(i32, i32)>>,
}

#[wasm_bindgen]
impl Heap32_2 {
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
    pub fn push(&mut self, value: JsValue, key1: i32, key2: i32) -> () {
        self.heap.push(Item { key: (key1, key2), value });
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
