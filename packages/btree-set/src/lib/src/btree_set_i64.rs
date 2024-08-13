use wasm_bindgen::prelude::*;
use std::collections::BTreeSet;

#[wasm_bindgen]
pub struct BinaryTreeSetInt64 {
    set: BTreeSet<i64>,
}

#[wasm_bindgen]
impl BinaryTreeSetInt64 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            set: BTreeSet::new(),
        }
    }

    #[wasm_bindgen]
    pub fn contains(&self, value: i64) -> bool {
        self.set.contains(&value)
    }

    #[wasm_bindgen]
    pub fn first_unwrap(&self) -> i64 {
        *self.set.first().unwrap()
    }

    #[wasm_bindgen]
    pub fn last_unwrap(&self) -> i64 {
        *self.set.last().unwrap()
    }

    #[wasm_bindgen]
    pub fn insert(&mut self, value: i64) -> bool {
        self.set.insert(value)
    }

    #[wasm_bindgen]
    pub fn pop_first_unwrap(&mut self) -> i64 {
        self.set.pop_first().unwrap()
    }

    #[wasm_bindgen]
    pub fn pop_last_unwrap(&mut self) -> i64 {
        self.set.pop_last().unwrap()
    }

    #[wasm_bindgen]
    pub fn remove(&mut self, value: i64) -> bool {
        self.set.remove(&value)
    }

    #[wasm_bindgen]
    pub fn clear(&mut self) -> () {
        self.set.clear();
    }
}
