use wasm_bindgen::prelude::*;
use std::collections::BTreeSet;

#[wasm_bindgen]
pub struct BinaryTreeSetUInt64 {
    set: BTreeSet<u64>,
}

#[wasm_bindgen]
impl BinaryTreeSetUInt64 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            set: BTreeSet::new(),
        }
    }

    #[wasm_bindgen]
    pub fn contains(&self, value: u64) -> bool {
        self.set.contains(&value)
    }

    #[wasm_bindgen]
    pub fn first_unwrap(&self) -> u64 {
        *self.set.first().unwrap()
    }

    #[wasm_bindgen]
    pub fn last_unwrap(&self) -> u64 {
        *self.set.last().unwrap()
    }

    #[wasm_bindgen]
    pub fn insert(&mut self, value: u64) -> bool {
        self.set.insert(value)
    }

    #[wasm_bindgen]
    pub fn pop_first_unwrap(&mut self) -> u64 {
        self.set.pop_first().unwrap()
    }

    #[wasm_bindgen]
    pub fn pop_last_unwrap(&mut self) -> u64 {
        self.set.pop_last().unwrap()
    }

    #[wasm_bindgen]
    pub fn remove(&mut self, value: u64) -> bool {
        self.set.remove(&value)
    }

    #[wasm_bindgen]
    pub fn clear(&mut self) -> () {
        self.set.clear();
    }
}
